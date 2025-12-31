import { API_BASE_URL } from "@/lib/config";
import type { BlockedIpType } from "../types/blocked-ip-type";

/* 
A function to add a blocked IP by making a POST request to the API.

@param blockedIpType - The blocked IP data to be sent in the request body.
@returns A promise that resolves to the added BlockedIpPostType.
@throws An error if the request fails.

@author IFD
@since 2025-12-31
*/
export async function addBlockedIp(blockedIpType: Partial<BlockedIpType>) {
  console.log("Adding blocked IP:", blockedIpType);

  const response = await fetch(`${API_BASE_URL}/block/ip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // send the raw object (do NOT wrap in { blockedIpType })
    body: JSON.stringify(blockedIpType),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to add blocked IP");
  }

  return;
}
// Custom hook to use IP lookup with React Query
// export function useIpLookup(ipAddress: string, enabled: boolean = false) {
//   return useQuery({
//     queryKey: ["ipData", ipAddress],
//     queryFn: () => fetchIpInfo(ipAddress),
//     enabled: enabled && !!ipAddress,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     retry: 2,
//   });
// }
