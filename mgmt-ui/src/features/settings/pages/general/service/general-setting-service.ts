import { API_BASE_URL } from "@/lib/config";
import type {
  GeneralSystemSetting,
  GeneralSystemSettingUpdate,
} from "../types/general-system-setting";
import { useQuery } from "@tanstack/react-query";

/* 
A function to get the general system settings by making a GET request to the API.

@returns A promise that resolves to the GeneralSystemSetting object.
@throws An error if the request fails.

@author IFD
@since 2026-01-10
*/
export async function getGeneralSettings(): Promise<GeneralSystemSetting> {
  const response = await fetch(`${API_BASE_URL}/system/settings`, {
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
  return data as GeneralSystemSetting;
}

//Custom hook to use IP lookup with React Query
export function useGeneralSettings() {
  return useQuery({
    queryKey: ["generalSettings"],
    queryFn: getGeneralSettings,
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
export async function updateGeneralSettings(
  generalSettings: GeneralSystemSettingUpdate,
) {
  const formData = new FormData();

  if (generalSettings.systemName !== undefined) {
    formData.append("systemName", generalSettings.systemName);
  }
  if (generalSettings.companyName !== undefined) {
    formData.append("companyName", generalSettings.companyName);
  }
  if (generalSettings.favicon) {
    formData.append("favicon", generalSettings.favicon);
  }
  if (generalSettings.logo) {
    formData.append("logo", generalSettings.logo);
  }

  const response = await fetch(`${API_BASE_URL}/system/settings`, {
    method: "PATCH",
    // Don't set Content-Type header - browser will set it automatically with boundary
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(errorText || "Failed to update general settings");
  }

  return;
}
