import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GeneralSettingFormSchema } from "./schema/settings-form-schema";
import { FieldError, FieldLabel, FieldLabelContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../../../../../../components/custom/image-upload";
import { updateGeneralSettings, useGeneralSettings } from "../../service/general-setting-service";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "@/lib/config";

export default function GeneralSettingsForm() {

    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();


    const { data: generalSettings } = useGeneralSettings();

    // Fallback state for broken images
    const [faviconError, setFaviconError] = useState(false);
    const [logoError, setLogoError] = useState(false);

    const form = useForm<yup.InferType<typeof GeneralSettingFormSchema>>({
        resolver: yupResolver(GeneralSettingFormSchema),
        defaultValues: {
            systemName: "",
            companyName: "",
            favicon: undefined,
            logo: undefined,
        },
        mode: "onChange",
    });

    // Reset form with fetched general settings
    useEffect(() => {
        if (generalSettings) {
            form.reset({
                systemName: generalSettings.systemName ?? "",
                companyName: generalSettings.companyName ?? "",
                favicon: undefined,
                logo: undefined,
            });
        }
    }, [generalSettings, form]);

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

    const handleFaviconChange = (files: File[]) => {
        form.setValue("favicon", files[0], { shouldDirty: true, shouldValidate: true });
    };

    const handleLogoChange = (files: File[]) => {
        form.setValue("logo", files[0], { shouldDirty: true, shouldValidate: true });
    };

    const getFaviconSrc = () => {
        if (faviconError) return "/favicon/favicon.ico";
        const url = generalSettings?.faviconUrl;
        if (url && url.length > 0) {
            if (/^https?:\/\//.test(url)) return url;
            return BACKEND_URL + url;
        }
        return "/favicon/favicon.ico";
    };

    const getLogoSrc = () => {
        if (logoError) return "/favicon/favicon.ico";
        const url = generalSettings?.logoUrl;
        if (url && url.length > 0) {
            if (/^https?:\/\//.test(url)) return url;
            return BACKEND_URL + url;
        }
        return "/favicon/favicon.ico";
    };

    return (
        <form className="space-y-8" onSubmit={form.handleSubmit(async (data) => {

            setIsLoading(true);

            try {
                await updateGeneralSettings(data);

                // Invalidate the query to refetch with new favicon/logo URLs
                await queryClient.invalidateQueries({ queryKey: ["generalSettings"] });

                form.reset(data);
                setUploadedFavicon([]);
                setUploadedLogo([]);

                toast.success("General Settings Updated", {
                    id: "update-general-settings-success",
                    description: `The general settings have been updated successfully.`,
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss("update-general-settings-success"),
                    },
                })
            } catch (error) {

                let errorMessage = "An unexpected error occurred.";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }

                toast.error("Failed to update general settings", {
                    id: "update-general-settings-error",
                    description: errorMessage,
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss("update-general-settings-error"),
                    },
                })

            }

            finally {
                setIsLoading(false);
            }

        })}>
            {/* Identity Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-base font-medium">Identity</h3>
                    <p className="text-sm text-muted-foreground">Basic information about your system and company.</p>
                </div>
                <div className="relative rounded-lg border border-border/50 p-6 space-y-6">
                    {isLoading && (
                        <div className="absolute inset-0 bg-accent-400/40 backdrop-blur-xs z-50 rounded-md" />
                    )}
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
                <div className="relative rounded-lg border border-border/50 p-6 space-y-6">
                    {isLoading && (
                        <div className="absolute inset-0 bg-accent-400/40 backdrop-blur-xs z-50 rounded-md" />
                    )}
                    <div className="grid grid-cols-[12rem_1fr] gap-4">
                        <img
                            src={getFaviconSrc()}
                            alt="Favicon Preview"
                            className="h-full aspect-square object-cover rounded-md max-w-48"
                            onError={() => setFaviconError(true)}
                        />
                        <ImageUpload
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
                            onFilesChange={handleFaviconChange}
                        />
                    </div>
                    <div className="border-t border-border/50" />
                    <div className="grid grid-cols-[12rem_1fr] gap-4">
                        <img
                            src={getLogoSrc()}
                            alt="Logo Preview"
                            className="h-full aspect-square object-cover rounded-md max-w-48"
                            onError={() => setLogoError(true)}
                        />
                        <ImageUpload
                            fileInputRef={logoInputRef}
                            setUploadedFiles={setUploadedLogo}
                            setFileProgresses={setLogoProgress}
                            uploadedFiles={uploadedLogo}
                            fileProgresses={logoProgress}
                            maxFiles={1}
                            fileSizeType="KB"
                            maxFileSize={250}
                            type="logo"
                            onFilesChange={handleLogoChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="reset" disabled={isLoading || !form.formState.isDirty} onClick={() => form.reset()}>
                        Reset Form
                    </Button>
                    <Button type="submit" disabled={isLoading || !form.formState.isDirty}>
                        {isLoading ? <span className="flex gap-2"><Spinner className="w-[10%] h-[10%]" />Saving...</span> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </form>
    );

}