import { useQuery } from "@tanstack/react-query";
import type { IpAddressInfoType } from "../../../../types/IpAddressInfoType";
import { API_BASE_URL } from "../../../../lib/config";

// Service function to fetch IP info for an IP address
async function fetchIpInfo(ipAddress: string): Promise<IpAddressInfoType> {
  const response = await fetch(
    `${API_BASE_URL}/ip/?ipAddress=${encodeURIComponent(ipAddress)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to fetch IP info");
  }

  const data = await response.json();

  // Transform the response to match our IpAddressInfoType
  return data as IpAddressInfoType;
}

// Custom hook to use IP lookup with React Query
export function useIpLookup(ipAddress: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["ipData", ipAddress],
    queryFn: () => fetchIpInfo(ipAddress),
    enabled: enabled && !!ipAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
