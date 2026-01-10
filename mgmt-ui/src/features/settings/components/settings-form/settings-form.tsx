import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SettingFormSchema } from "./schema/settings-form-schema";
import { FieldError, FieldLabel, FieldLabelContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SettingImageUpload from "./components/setting-image-upload";
import { Button } from "@/components/ui/button";

export default function SettingsForm() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<yup.InferType<typeof SettingFormSchema>>({
        resolver: yupResolver(SettingFormSchema),
        defaultValues: {
            systemName: "",
            companyName: "",
            favicon: undefined,
            logo: undefined,
        },
        mode: "onSubmit",
    });

    const faviconInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFavicon, setUploadedFavicon] = useState<File[]>([]);
    const [faviconProgress, setFaviconProgress] = useState<Record<string, number>>(
        {}
    );

    const logoInputRef = useRef<HTMLInputElement>(null);
    const [uploadedLogo, setUploadedLogo] = useState<File[]>([]);
    const [logoProgress, setLogoProgress] = useState<Record<string, number>>(
        {}
    );

    return (
        <form className="space-y-8">
            {/* Identity Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-base font-medium">Identity</h3>
                    <p className="text-sm text-muted-foreground">Basic information about your system and company.</p>
                </div>
                <div className="rounded-lg border border-border/50 p-6 space-y-6">
                    <Controller
                        name="systemName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <FieldLabel htmlFor="systemName-field" className="pt-2 text-sm font-medium">
                                    <FieldLabelContent label="System Name" tooltipText="Enter the name of the system." />
                                </FieldLabel>
                                <div className="space-y-1.5">
                                    <Input
                                        {...field}
                                        id="systemName-field"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter system name"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-muted-foreground">This name will be displayed throughout the application.</p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </div>
                        )}
                    />
                    <div className="border-t border-border/50" />
                    <Controller
                        name="companyName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <FieldLabel htmlFor="companyName-field" className="pt-2 text-sm font-medium">
                                    <FieldLabelContent label="Company Name" tooltipText="Enter the name of the company." />
                                </FieldLabel>
                                <div className="space-y-1.5">
                                    <Input
                                        {...field}
                                        id="companyName-field"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter company name"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-muted-foreground">Your company name for branding purposes.</p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>

            {/* Branding Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-base font-medium">Branding</h3>
                    <p className="text-sm text-muted-foreground">Customize your system's visual identity with logos and icons.</p>
                </div>
                <div className="rounded-lg border border-border/50 p-6 space-y-6">
                    <SettingImageUpload
                        fileInputRef={faviconInputRef}
                        setUploadedFiles={setUploadedFavicon}
                        setFileProgresses={setFaviconProgress}
                        uploadedFiles={uploadedFavicon}
                        fileProgresses={faviconProgress}
                        maxFiles={1}
                        fileSizeType="KB"
                        maxFileSize={100}
                        type="favicon"
                        recommendedSize="32x32 pixels"
                    />
                    <div className="border-t border-border/50" />
                    <SettingImageUpload
                        fileInputRef={logoInputRef}
                        setUploadedFiles={setUploadedLogo}
                        setFileProgresses={setLogoProgress}
                        uploadedFiles={uploadedLogo}
                        fileProgresses={logoProgress}
                        maxFiles={1}
                        fileSizeType="KB"
                        maxFileSize={250}
                        type="logo"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="reset" disabled={isLoading || !form.formState.isDirty} onClick={() => form.reset()}>
                        Reset Form
                    </Button>
                    <Button type="submit" disabled={isLoading || !form.formState.isDirty || !form.formState.isValid}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </form>
    );

}