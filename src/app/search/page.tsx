import { getAllListings, getHosts } from "@/lib/queries/operators";
import SearchClient from "./SearchClient";

export default async function SearchPage() {
  const [listings, operators] = await Promise.all([
    getAllListings(),
    getHosts(),
  ]);
  return <SearchClient listings={listings} operators={operators} />;
}
