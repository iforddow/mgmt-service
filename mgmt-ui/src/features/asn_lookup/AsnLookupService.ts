import { useQuery } from "@tanstack/react-query";
import type { AsnInfoType } from "../../types/AsnInfoType";
import { API_BASE_URL } from "../../lib/config";

// Service function to fetch ASN data for an IP address
async function fetchAsnData(ipAddress: string): Promise<AsnInfoType> {
  const response = await fetch(
    `${API_BASE_URL}/asn/?ipAddress=${encodeURIComponent(ipAddress)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ASN data");
  }

  const data = await response.json();

  // Transform the response to match our AsnInfoType
  return {
    asnNumber: data.autonomousSystemNumber || "Unknown",
    asnOrg: data.autonomousSystemOrganization || "Unknown",
  };
}

// Custom hook to use ASN lookup with React Query
export function useAsnLookup(ipAddress: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["asnData", ipAddress],
    queryFn: () => fetchAsnData(ipAddress),
    enabled: enabled && !!ipAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
