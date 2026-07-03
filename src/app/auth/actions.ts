"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { roleHome } from "@/lib/auth";

export type AuthState = { error?: string; message?: string };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// ── Sign in ─────────────────────────────────────────────
export async function login(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/") || "/";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");

  // Honour an explicit deep-link (e.g. finishing a booking); otherwise send
  // the user to their role's home.
  if (redirectTo && redirectTo !== "/") redirect(redirectTo);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };
  redirect(roleHome(profile?.role));
}

// ── Sign up ─────────────────────────────────────────────
// One account model (Airbnb-style): everyone signs up as a customer and can
// later "become a host" by creating a houseboat. Hosting is a capability, not
// a separate signup.
export async function signupCustomer(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role: "customer" },
      emailRedirectTo: `${SITE_URL}/auth/confirm`,
    },
  });
  if (error) return { error: error.message };

  // If email confirmation is disabled, a session is returned → straight in.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect(redirectTo || "/");
  }

  // Otherwise the user must confirm via the emailed link.
  return {
    message: "Check your email to confirm your account, then sign in.",
  };
}

// ── Sign out ────────────────────────────────────────────
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
