import { redirect } from "next/navigation";

// A confirmation must reference a specific booking (/booking/confirmation/[id]).
// Anyone hitting the bare path is sent to their bookings list.
export default function ConfirmationIndex() {
  redirect("/account/bookings");
}
