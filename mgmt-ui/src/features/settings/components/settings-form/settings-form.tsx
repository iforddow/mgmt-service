import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SettingFormSchema } from "./schema/settings-form-schema";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLabelContent, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FileDropzone } from "@/components/ui/dropzone";
import { FileList } from "@/components/ui/file-list";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

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
    const [uploadedFavicon, setUploadedFiles] = useState<File[]>([]);
    const [faviconProgress, setFileProgresses] = useState<Record<string, number>>(
        {}
    );

    return (
        <div className="bg-accent rounded-md p-4">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>System Settings</FieldLegend>
                        <FieldDescription>Configure the basic system settings such as system name, company name, favicon, and logo.</FieldDescription>
                        <FieldGroup >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Controller
                                    name="systemName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="systemName-field">
                                                <FieldLabelContent label={"System Name"} tooltipText="Enter the name of the system." />
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="systemName-field"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter system name"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="companyName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="companyName-field">
                                                <FieldLabelContent label={"Company Name"} tooltipText="Enter the name of the company." />
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="companyName-field"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter company name"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <div>
                                    <FileDropzone
                                        fileInputRef={fileInputRef}
                                        handleBoxClick={handleBoxClick}
                                        handleDragOver={handleDragOver}
                                        handleDrop={handleDrop}
                                        handleFileSelect={handleFileSelect}
                                        label="Select a Favicon"
                                        maxFileSizeMB={2}
                                    />
                                    <FileList
                                        uploadedFiles={uploadedFiles}
                                        fileProgresses={fileProgresses}
                                        removeFile={removeFile}
                                    />
                                </div>
                                <div>
                                    <FileDropzone
                                        fileInputRef={fileInputRef}
                                        handleBoxClick={handleBoxClick}
                                        handleDragOver={handleDragOver}
                                        handleDrop={handleDrop}
                                        handleFileSelect={handleFileSelect}
                                    />
                                    <FileList
                                        uploadedFiles={uploadedFiles}
                                        fileProgresses={fileProgresses}
                                        removeFile={removeFile}
                                    />
                                </div>
                            </div>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    );

}