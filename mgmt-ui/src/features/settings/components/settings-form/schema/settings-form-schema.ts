import * as yup from "yup";

export const SettingFormSchema = yup.object().shape({
  systemName: yup.string().trim(),

  companyName: yup.string().trim(),

  favicon: yup.mixed().test("fileSize", "The file is too large", (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) return true; // attachment is optional
    return value[0].size <= 2000000;
  }),

  logo: yup.mixed().test("fileSize", "The file is too large", (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) return true; // attachment is optional
    return value[0].size <= 2000000;
  }),
});
