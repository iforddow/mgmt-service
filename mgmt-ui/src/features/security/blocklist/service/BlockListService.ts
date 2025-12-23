import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../../lib/config";
import type { BlockedIpType } from "../../../../types/BlockedIpType";
import type { BlockedAsnType } from "../../../../types/BlockedAsnType";

// Spring Boot paginated response type
interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Service function to fetch IP info for an IP address
async function fetchBlockedIpListInfo(
  page?: number,
  size?: number,
): Promise<BlockedIpType[]> {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("size", size.toString());

  const queryString = params.toString();
  const url = `${API_BASE_URL}/block/ip${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch IP info");
  }

  const data = await response.json();

  console.log("Fetched IP info:", data);

  // Handle both paginated response and plain array
  if (Array.isArray(data)) {
    return data as BlockedIpType[];
  }

  // Spring Boot paginated response
  if (data && typeof data === "object" && "content" in data) {
    return (data as PagedResponse<BlockedIpType>).content;
  }

  // Fallback - return empty array
  return [];
}

// Custom hook to use IP lookup with React Query
export function useBlockedIpListLookup(
  page?: number,
  size?: number,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ["blockedIpData", page, size],
    queryFn: () => fetchBlockedIpListInfo(page, size),
    enabled: enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// Service function to fetch IP info for an IP address
async function fetchBlockedAsnListInfo(
  page?: number,
  size?: number,
): Promise<BlockedAsnType[]> {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("size", size.toString());

  const queryString = params.toString();
  const url = `${API_BASE_URL}/block/asn${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch ASN info");
  }

  const data = await response.json();

  console.log("Fetched ASN info:", data);

  // Handle both paginated response and plain array
  if (Array.isArray(data)) {
    return data as BlockedAsnType[];
  }

  // Spring Boot paginated response
  if (data && typeof data === "object" && "content" in data) {
    return (data as PagedResponse<BlockedAsnType>).content;
  }

  // Fallback - return empty array
  return [];
}

// Custom hook to use IP lookup with React Query
export function useBlockedAsnListLookup(
  page?: number,
  size?: number,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ["blockedAsnData", page, size],
    queryFn: () => fetchBlockedAsnListInfo(page, size),
    enabled: enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
