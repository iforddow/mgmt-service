import { localStorageColorSchemeManager } from "@mantine/core";

export const colorSchemeManager = localStorageColorSchemeManager({
  key: "color-scheme",
});

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";
