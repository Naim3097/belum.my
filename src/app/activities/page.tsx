import type { Metadata } from "next";
import { getActivities } from "@/lib/queries/activities";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Houseboat Activities — Temenggor Lake & Royal Belum",
  description:
    "Water activities, jungle treks, cultural visits, and wildlife encounters from houseboats on Temenggor Lake. Most are included in standard packages.",
  alternates: { canonical: "https://belumplatform.com/activities" },
};

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return <ActivitiesClient activities={activities} />;
}
