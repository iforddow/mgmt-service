import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import type {
  StorageSystemSetting,
  StorageSystemSettingUpdate,
} from "../types/storage-system-setting";

/* 
A function to get the general system settings by making a GET request to the API.

@returns A promise that resolves to the GeneralSystemSetting object.
@throws An error if the request fails.

@author IFD
@since 2026-01-10
*/
export async function getStorageSettings(): Promise<StorageSystemSetting> {
  const response = await fetch(`${API_BASE_URL}/system/settings/storage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to fetch general settings");
  }

  const data = await response.json();
  return data as StorageSystemSetting;
}

//Custom hook to use IP lookup with React Query
export function useStorageSettings() {
  return useQuery({
    queryKey: ["storageSettings"],
    queryFn: getStorageSettings,
    staleTime: 20 * 60 * 1000,
    retry: 2,
  });
}

/* 
A function to update general settings by making a PATCH request to the API.

@param generalSettings - The general settings data to be sent in the request body.
@returns A promise that resolves when the update is successful.
@throws An error if the request fails.

@author IFD
@since 2026-01-10
*/
export async function updateStorageSettings(
  storageSettings: StorageSystemSettingUpdate,
) {
  const response = await fetch(`${API_BASE_URL}/system/settings/storage`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storageSettings),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to update storage settings");
  }

  return;
}

interface TestStorageConnectionResponse {
  connectionState: "active" | "down" | "not-configured";
}

/* 
A method to call the test connection API for storage settings.

@returns A promise that resolves to a boolean indicating if the connection test was successful.
@throws An error if the request fails.

@author IFD
@since 2026-01-10
*/
export async function testStorageConnection(): Promise<TestStorageConnectionResponse> {
  const response = await fetch(
    `${API_BASE_URL}/system/settings/storage/test-connection`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to test storage connection");
  }

  if (response.status === 204) {
    return { connectionState: "not-configured" };
  }

  return { connectionState: "active" };
}

/* 
A custom hook to use the storage connection test with React Query.

@returns The result of the useQuery hook for testing storage connection.

@author IFD
@since 2026-01-10
*/
export function useStorageConnectionEstablished() {
  return useQuery({
    queryKey: ["storageConnectionTest"],
    queryFn: testStorageConnection,
    staleTime: 1 * 60 * 1000,
    retry: 2,
  });
}

/* 
A service method to remove storage settings by making a DELETE request to the API.

@author IFD
@since 2026-01-10
*/
export async function clearStorageSettings() {
  const response = await fetch(`${API_BASE_URL}/system/settings/storage`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to delete storage settings");
  }

  return;
}
