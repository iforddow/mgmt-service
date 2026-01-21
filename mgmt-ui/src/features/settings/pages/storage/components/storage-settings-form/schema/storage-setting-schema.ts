import * as yup from "yup";

export const StorageSettingFormSchema = yup.object().shape({
  accessKey: yup.string().trim().required("Access Key is required"),

  secretKey: yup.string().trim().required("Secret Key is required"),

  endpoint: yup
    .string()
    .trim()
    .url("Endpoint must be a valid URL")
    .required("Endpoint is required"),

  bucketName: yup.string().trim().required("Bucket Name is required"),

  publicUrl: yup
    .string()
    .trim()
    .url("Public URL must be a valid URL")
    .required("Public URL is required"),
});
