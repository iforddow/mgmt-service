import { API_BASE_URL } from "@/lib/config";
import type { BlockedIpType } from "../types/blocked-ip-type";
import { useQuery } from "@tanstack/react-query";
import type { Page } from "@/lib/types/pageable-types";

/* 
A function to add a blocked IP by making a POST request to the API.

@param blockedIpType - The blocked IP data to be sent in the request body.
@returns A promise that resolves to the added BlockedIpPostType.
@throws An error if the request fails.

@author IFD
@since 2025-12-31
*/
export async function addBlockedIp(blockedIpType: Partial<BlockedIpType>) {
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

export async function fetchBlockedIps({
  page,
  size,
  filter,
}: {
  page: number;
  size: number;
  filter?: string | null;
}): Promise<Page> {
  if (page < 0 || size < 1) {
    throw new Error("Invalid page or size parameter");
  }

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (filter && filter.length > 0) {
    params.append("filter", filter);
  }

  console.log("Fetching blocked IPs with params:", params.toString());

  const response = await fetch(
    `${API_BASE_URL}/block/ip?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to fetch blocked IPs");
  }

  const data = await response.json();

  return data as Page;
}

//Custom hook to use IP lookup with React Query
export function useBlockedIps(
  page: number,
  size: number,
  enabled: boolean = false,
  filter?: string | null,
) {
  return useQuery({
    queryKey: ["blockedIps", page, size, filter ?? ""],
    queryFn: () => fetchBlockedIps({ page, size, filter }),
    enabled: enabled && page >= 0 && size > 0,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
