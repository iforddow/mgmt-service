export type SystemSetting = {
  systemName: string;
  companyName: string;
  faviconUrl: string;
  logoUrl: string;
};

export type SystemSettingUpdate = {
  systemName?: string;
  companyName?: string;
  favicon?: File | null;
  logo?: File | null;
};
