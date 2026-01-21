export type GeneralSystemSetting = {
  systemName: string;
  companyName: string;
  faviconUrl: string;
  logoUrl: string;
};

export type GeneralSystemSettingUpdate = {
  systemName?: string;
  companyName?: string;
  favicon?: File | null;
  logo?: File | null;
};
