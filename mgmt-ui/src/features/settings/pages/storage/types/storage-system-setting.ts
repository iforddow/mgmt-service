export type StorageSystemSetting = {
  accessKey: string;
  secretKey: string;
  endpoint: string;
  bucketName: string;
  publicUrl: string;
};

export type StorageSystemSettingUpdate = {
  accessKey?: string;
  secretKey?: string;
  endpoint?: string;
  bucketName?: string;
  publicUrl?: string;
};
