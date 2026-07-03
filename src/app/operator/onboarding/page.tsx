import { redirect } from "next/navigation";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
  const operator = await getMyOperator();
  if (operator) redirect("/operator");

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-navy-900">
        Set up your houseboat
      </h1>
      <p className="mb-8 mt-1 text-sm text-slate-500">
        Tell us about your houseboat to start receiving bookings on Belum.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <OnboardingForm />
      </div>
    </div>
  );
}
