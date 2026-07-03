import { redirect } from "next/navigation";
import { getMyOperator, getMyPackages } from "@/lib/queries/operator-dashboard";
import PackagesManager from "./PackagesManager";

export default async function OperatorPackagesPage() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  const packages = await getMyPackages(operator.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Packages
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Create and manage the bookable packages for {operator.name}.
      </p>
      <PackagesManager packages={packages} />
    </div>
  );
}
