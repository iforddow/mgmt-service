import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldError, FieldLabel, FieldLabelContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { StorageSettingFormSchema } from "./schema/storage-setting-schema";
import { clearStorageSettings, testStorageConnection, updateStorageSettings, useStorageConnectionEstablished, useStorageSettings } from "../../service/storage-setting-service";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import StatusIndicator from "@/components/ui/status-indicator";
import { Trash2 } from "lucide-react";
import { ConfirmActionModal } from "@/components/custom/modals/confirm-action-modal";
import PasswordInput from "@/components/custom/input/password-input";

export default function StorageSettingsForm() {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const { data: storageSettings } = useStorageSettings();
    const { data: connectionTestResult, isLoading: isConnectionTestLoading } = useStorageConnectionEstablished();

    const form = useForm<yup.InferType<typeof StorageSettingFormSchema>>({
        resolver: yupResolver(StorageSettingFormSchema),
        defaultValues: {
            accessKey: "",
            secretKey: "",
            endpoint: "",
            bucketName: "",
            publicUrl: "",
        },
        mode: "onSubmit",
    });

    // Always derive state and allSettingsEmpty from latest hook data
    const allSettingsEmpty = !storageSettings || [
        storageSettings.accessKey,
        storageSettings.secretKey,
        storageSettings.endpoint,
        storageSettings.bucketName,
        storageSettings.publicUrl
    ].every(v => !v || v.trim() === "");

    let state: "active" | "down" | "fixing" | "idle" = "idle";
    if (connectionTestResult?.connectionState === "active") {
        state = "active";
    } else if (connectionTestResult?.connectionState === "not-configured") {
        state = "idle";
    } else if (connectionTestResult) {
        state = "down";
    }

    // Reset form with fetched general settings
    useEffect(() => {
        if (storageSettings) {
            form.reset({
                accessKey: storageSettings.accessKey ?? "",
                secretKey: storageSettings.secretKey ?? "",
                endpoint: storageSettings.endpoint ?? "",
                bucketName: storageSettings.bucketName ?? "",
                publicUrl: storageSettings.publicUrl ?? "",
            });
        }
    }, [storageSettings, form]);

    return (
        <form className="space-y-8" onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
                await updateStorageSettings(data);
                await queryClient.invalidateQueries({ queryKey: ["storageSettings", "storageConnectionTest"] });
                await queryClient.refetchQueries({ queryKey: ["storageSettings"] });
                await queryClient.refetchQueries({ queryKey: ["storageConnectionTest"] });
                await testStorageConnection();
                // Reset the form with the submitted data (the hooks will update the UI)
                form.reset(data);
                toast.success("Storage Settings Updated", {
                    id: "update-storage-settings-success",
                    description: `The storage settings have been updated successfully.`,
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss("update-storage-settings-success"),
                    },
                })
            } catch (error) {
                let errorMessage = "An unexpected error occurred.";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                toast.error("Failed to update storage settings", {
                    id: "update-storage-settings-error",
                    description: errorMessage,
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss("update-storage-settings-error"),
                    },
                })
            } finally {
                setIsLoading(false);
            }
        })}>
            {/* Identity Section */}
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-base font-medium">Storage Configuration</h3>
                        <p className="text-sm text-muted-foreground">Configure your external storage service settings here.</p>
                    </div>
                    <div>
                        {!isConnectionTestLoading ? (
                            <Badge variant={"secondary"} className="px-3 py-1">
                                <StatusIndicator state={state} label={state === "active" ? "Connected" : state === "down" ? "Error" : state === "idle" ? "Not Configured" : "Unknown"} />
                            </Badge>
                        ) : null}
                    </div>
                </div>
                <div className="relative rounded-lg border border-border/50 p-6 space-y-6">
                    {isLoading && (
                        <div className="absolute inset-0 bg-accent-400/40 backdrop-blur-xs z-50 rounded-md" />
                    )}
                    <Controller
                        name="accessKey"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <PasswordInput
                                    field={field}
                                    id="accessKey-field"
                                    label="Access Key"
                                    tooltipText="Enter the access key for storage."
                                    required
                                    fieldState={fieldState}
                                    description="This key will be used for storage access throughout the application."
                                />
                            </div>
                        )}
                    />
                    <div className="border-t border-border/50" />
                    <Controller
                        name="secretKey"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <PasswordInput
                                    field={field}
                                    id="secretKey-field"
                                    label="Secret Key"
                                    tooltipText="Enter the secret key for storage."
                                    required
                                    fieldState={fieldState}
                                    description="Your secret key for storage access."
                                />
                            </div>
                        )}
                    />
                    <div className="border-t border-border/50" />
                    <Controller
                        name="endpoint"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <FieldLabel htmlFor="endpoint-field" className="pt-2 text-sm font-medium">
                                    <FieldLabelContent label="Endpoint" tooltipText="Enter the endpoint for storage." required />
                                </FieldLabel>
                                <div className="space-y-1.5">
                                    <Input
                                        {...field}
                                        id="endpoint-field"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter endpoint"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-muted-foreground">Your endpoint for storage access.</p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </div>
                        )}
                    />
                    <div className="border-t border-border/50" />
                    <Controller
                        name="bucketName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <FieldLabel htmlFor="bucketName-field" className="pt-2 text-sm font-medium">
                                    <FieldLabelContent label="Bucket Name" tooltipText="Enter the bucket name for storage." required />
                                </FieldLabel>
                                <div className="space-y-1.5">
                                    <Input
                                        {...field}
                                        id="bucketName-field"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter bucket name"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-muted-foreground">Your bucket name for storage access.</p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </div>
                        )}
                    />
                    <div className="border-t border-border/50" />
                    <Controller
                        name="publicUrl"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                <FieldLabel htmlFor="publicUrl-field" className="pt-2 text-sm font-medium">
                                    <FieldLabelContent label="Public URL" tooltipText="Enter the public URL for storage." required />
                                </FieldLabel>
                                <div className="space-y-1.5">
                                    <Input
                                        {...field}
                                        id="publicUrl-field"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter public URL"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-muted-foreground">Your public URL for storage access.</p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    {
                        storageSettings && !allSettingsEmpty && (
                            <ConfirmActionModal
                                triggerElement={<Button variant="destructive"><Trash2 /> Remove Connection</Button>}
                                title="Are you sure?"
                                description="Are you sure you want to remove this storage connection? This action cannot be undone."
                                actionButtonLabel="Delete"
                                onConfirm={async () => {
                                    await clearStorageSettings();
                                    await queryClient.invalidateQueries({ queryKey: ["storageSettings", "storageConnectionTest"] });
                                    await queryClient.refetchQueries({ queryKey: ["storageSettings"] });
                                    await queryClient.refetchQueries({ queryKey: ["storageConnectionTest"] });
                                    // Reset the form to empty values
                                    form.reset({
                                        accessKey: "",
                                        secretKey: "",
                                        endpoint: "",
                                        bucketName: "",
                                    });
                                }}
                            />
                        )
                    }
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