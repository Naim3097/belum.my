"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * After returning from LeanX, poll the verify endpoint a few times to
 * reconcile a payment the webhook may not have delivered yet. Stops early if
 * payments aren't configured (503) or once the booking reads as paid.
 */
export default function PaymentReturnPoller({
  bookingId,
  initialStatus,
}: {
  bookingId: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    if (initialStatus === "paid") return;
    let cancelled = false;
    let attempts = 0;

    async function tick() {
      if (cancelled || done.current || attempts >= 3) return;
      attempts += 1;
      try {
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: bookingId }),
        });
        if (res.status === 503) return; // payments not configured — stop
        const data = await res.json();
        if (data.paymentStatus === "paid") {
          done.current = true;
          router.refresh();
          return;
        }
      } catch {
        /* transient — retry */
      }
      if (!cancelled && attempts < 3) setTimeout(tick, 2500);
    }

    const t = setTimeout(tick, 1500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [bookingId, initialStatus, router]);

  return null;
}
