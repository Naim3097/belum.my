import { Suspense } from "react";
import BookingContent from "./BookingContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getListingById, getHostById } from "@/lib/queries/operators";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { getBankList, type LeanXBank } from "@/lib/leanx";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const { listing: listingId } = await searchParams;
  const listing = listingId ? await getListingById(listingId) : null;
  const host = listing ? await getHostById(listing.hostId) : null;

  // Whether the visitor is signed in — drives the guest-vs-login choice.
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  const isLoggedIn = !!user;

  // If the operator has LeanX connected, offer real bank options at checkout.
  let leanxEnabled = false;
  let leanxBanks: LeanXBank[] = [];
  if (host && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createServiceRoleClient();
    const { data: creds } = await admin
      .from("operator_leanx")
      .select("*")
      .eq("operator_id", host.id)
      .maybeSingle();
    if (creds?.enabled && creds.api_key && creds.collection_uuid) {
      leanxEnabled = true;
      leanxBanks = await getBankList({
        apiKey: creds.api_key,
        collectionUuid: creds.collection_uuid,
        environment: creds.environment,
      });
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
            Loading…
          </div>
        }
      >
        <BookingContent
          listing={listing}
          host={host}
          leanxEnabled={leanxEnabled}
          leanxBanks={leanxBanks}
          isLoggedIn={isLoggedIn}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
