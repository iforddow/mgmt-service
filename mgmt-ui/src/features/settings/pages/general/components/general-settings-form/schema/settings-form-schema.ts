import * as yup from "yup";

export const GeneralSettingFormSchema = yup.object().shape({
  systemName: yup.string().trim(),

  companyName: yup.string().trim(),

  favicon: yup
    .mixed<File>()
    .nullable()
    .test("fileSize", "The file is too large", (value) => {
      if (!value) return true; // attachment is optional
      return value.size <= 2000000;
    }),

  logo: yup
    .mixed<File>()
    .nullable()
    .test("fileSize", "The file is too large", (value) => {
      if (!value) return true; // attachment is optional
      return value.size <= 2000000;
    }),
});
