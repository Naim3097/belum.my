import { redirect } from "next/navigation";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import ProfileForm from "./ProfileForm";

export default async function OperatorProfilePage() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Houseboat Profile
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        This is what travellers see on your public page and listings.
      </p>
      <ProfileForm operator={operator} ownerId={operator.owner_id ?? ""} />
    </div>
  );
}
