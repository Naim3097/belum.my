import { redirect } from "next/navigation";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import { createClient } from "@/lib/supabase/server";
import PaymentsForm from "./PaymentsForm";

export default async function OperatorPaymentsPage() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  const supabase = await createClient();
  const { data: leanx } = await supabase
    .from("operator_leanx")
    .select("*")
    .eq("operator_id", operator.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Payment Settings
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Configure your LeanX payment gateway. Until connected, bookings are
        recorded as “payment pending”.
      </p>
      <PaymentsForm leanx={leanx} />
    </div>
  );
}
