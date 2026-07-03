import crypto from "node:crypto";

/**
 * LeanX payment gateway wrapper (Malaysian FPX / e-wallets).
 * See LEANX_INTEGRATION.md for the full contract. Key rules encoded here:
 *  - Auth is a plain `auth-token` header (NOT Authorization: Bearer).
 *  - `amount` must be a 2-decimal STRING ("79.00").
 *  - email + phone must be non-empty (placeholders as a last resort).
 *  - Success sentinel is `response_code === 2000`.
 *  - Webhook signatures are HMAC-SHA256 over the RAW body, header
 *    `x-leanx-signature`; verification fails closed.
 */

const DEFAULT_HOST = "https://api.leanx.io";

export type LeanXConfig = {
  apiKey: string; // LP-...  (auth-token)
  collectionUuid: string; // Dc-/CL-...
  environment?: string; // 'test' | 'live'
};

function apiHost(): string {
  return process.env.LEANX_API_HOST || DEFAULT_HOST;
}

function authHeaders(apiKey: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "auth-token": apiKey, // NOT "Authorization: Bearer"
  };
}

/** LeanX wants amounts as a fixed 2dp string. */
export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

// Never send empty email/phone — LeanX silently fails otherwise.
const PLACEHOLDER_EMAIL = "noreply@customer.com";
const PLACEHOLDER_PHONE = "60123456789";

export type CreateBillInput = {
  amount: number;
  invoiceRef: string; // our reference (booking-based)
  fullName: string;
  email: string;
  phone: string;
  redirectUrl: string; // where LeanX returns the customer
  callbackUrl: string; // our webhook
  paymentServiceId?: string; // bank/e-wallet id (required for silent bill)
};

export type CreateBillResult =
  | { ok: true; redirectUrl: string; billNo: string }
  | { ok: false; error: string; code?: number };

/** POST create-bill-silent → returns a redirect URL for the customer. */
export async function createBillSilent(
  config: LeanXConfig,
  input: CreateBillInput
): Promise<CreateBillResult> {
  const payload = {
    collection_uuid: config.collectionUuid,
    amount: formatAmount(input.amount),
    invoice_ref: input.invoiceRef,
    full_name: input.fullName || "Customer",
    email: input.email?.trim() || PLACEHOLDER_EMAIL,
    phone_number: input.phone?.trim() || PLACEHOLDER_PHONE,
    redirect_url: input.redirectUrl,
    callback_url: input.callbackUrl,
    ...(input.paymentServiceId
      ? { payment_service_id: input.paymentServiceId }
      : {}),
  };

  let json: {
    response_code?: number;
    data?: { redirect_url?: string; bill_no?: string };
    description?: string;
    breakdown_errors?: unknown;
  };
  try {
    const res = await fetch(`${apiHost()}/api/v1/merchant/create-bill-silent`, {
      method: "POST",
      headers: authHeaders(config.apiKey),
      body: JSON.stringify(payload),
    });
    json = await res.json();
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  if (json.response_code === 2000 && json.data?.redirect_url) {
    return {
      ok: true,
      redirectUrl: json.data.redirect_url,
      billNo: json.data.bill_no ?? "",
    };
  }
  return {
    ok: false,
    error:
      json.description ||
      (json.breakdown_errors ? JSON.stringify(json.breakdown_errors) : "LeanX bill creation failed"),
    code: json.response_code,
  };
}

export type LeanXBank = {
  payment_service_id: string;
  name: string;
  [key: string]: unknown;
};

/** Bank / e-wallet list for silent-bill payment_service_id selection. */
export async function getBankList(config: LeanXConfig): Promise<LeanXBank[]> {
  try {
    const res = await fetch(
      `${apiHost()}/api/v1/merchant/list-payment-services`,
      {
        method: "POST",
        headers: authHeaders(config.apiKey),
        body: JSON.stringify({ collection_uuid: config.collectionUuid }),
      }
    );
    const json = await res.json();
    const list = json?.data ?? json?.banks ?? [];
    return Array.isArray(list) ? (list as LeanXBank[]) : [];
  } catch {
    return [];
  }
}

/** Poll transaction status. LeanX 404s intermittently — caller should retry. */
export async function verifyLeanXPayment(
  config: LeanXConfig,
  ref: { billNo?: string; invoiceRef?: string }
): Promise<{ status?: string; raw?: unknown; error?: string }> {
  try {
    const res = await fetch(
      `${apiHost()}/api/v1/merchant/transaction-status`,
      {
        method: "POST",
        headers: authHeaders(config.apiKey),
        body: JSON.stringify({
          ...(ref.billNo ? { bill_no: ref.billNo } : {}),
          ...(ref.invoiceRef ? { invoice_ref: ref.invoiceRef } : {}),
        }),
      }
    );
    const json = await res.json();
    return { status: json?.data?.status ?? json?.status, raw: json };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

/**
 * Verify a webhook signature. HMAC-SHA256 over the raw body, timing-safe
 * comparison. Fails closed (returns false) on any mismatch or missing input.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null | undefined,
  secretKey: string | null | undefined
): boolean {
  if (!signature || !secretKey) return false;
  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(rawBody)
    .digest("hex");
  if (signature.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expected, "utf-8")
    );
  } catch {
    return false;
  }
}

export type InternalPaymentState = {
  transactionStatus:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled"
    | "refunded";
  paymentStatus: "unpaid" | "paid" | "refunded";
};

/** Map a LeanX status string to our internal transaction + payment states. */
export function mapLeanXStatus(status: string | undefined): InternalPaymentState {
  switch ((status ?? "").toLowerCase()) {
    case "success":
    case "paid":
    case "completed":
      return { transactionStatus: "completed", paymentStatus: "paid" };
    case "pending":
    case "processing":
      return { transactionStatus: "processing", paymentStatus: "unpaid" };
    case "failed":
    case "declined":
      return { transactionStatus: "failed", paymentStatus: "unpaid" };
    case "cancelled":
      return { transactionStatus: "cancelled", paymentStatus: "unpaid" };
    case "refunded":
      return { transactionStatus: "refunded", paymentStatus: "refunded" };
    default:
      return { transactionStatus: "pending", paymentStatus: "unpaid" };
  }
}
