import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLabelContent,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BlockedIpFormSchema, blockReasonLabels } from "./schema/blocked-ip-form-schema"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@/components/ui/dialog"
import { DateTimePicker } from "@/components/shadcn/date-time-picker"
import { addBlockedIp } from "../../services/blocked-ip-service"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AddBlockedIpForm({ setDialogState }: { setDialogState?: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<yup.InferType<typeof BlockedIpFormSchema>>({
        resolver: yupResolver(BlockedIpFormSchema),
        defaultValues: {
            ipAddress: "",
            cidrRange: null,
            scope: undefined,
            serviceName: undefined,
            reason: undefined,
            reasonNotes: "",
            blockType: undefined,
            severity: undefined,
            expiresAt: null,
        },
        mode: "onSubmit",
    });

    const scope = form.watch("scope")
    const blockType = form.watch("blockType")

    return (
        <div>
            {isLoading && (
                <div className="fixed inset-0 bg-accent-400/40 backdrop-blur-xs z-50 flex items-center justify-center rounded-md">
                    <Spinner className="w-[10%] h-[10%]" />
                </div>
            )}
            <ScrollArea className="h-[90vh]">
                <form id="form-blocked-ip" onSubmit={form.handleSubmit(async (data) => {
                    setIsLoading(true);

                    setTimeout(async () => {

                        try {
                            await addBlockedIp(data);

                            form.reset();
                            setDialogState && setDialogState(false);

                            toast.success("IP Blocked", {
                                id: "add-blocked-ip-success",
                                description: `The IP address ${data.ipAddress} has been blocked successfully.`,
                                action: {
                                    label: "Close",
                                    onClick: () => toast.dismiss("add-blocked-ip-success"),
                                },
                            })
                        } catch (error) {

                            let errorMessage = "An unexpected error occurred.";
                            if (error instanceof Error) {
                                errorMessage = error.message;
                            }

                            toast.error("Failed to block IP", {
                                id: "add-blocked-ip-error",
                                description: errorMessage,
                                action: {
                                    label: "Close",
                                    onClick: () => toast.dismiss("add-blocked-ip-error"),
                                },
                            })
                        } finally {
                            setIsLoading(false);
                        }
                    }, 5000);
                })}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>IP Details</FieldLegend>
                            <FieldDescription>Enter the details for the IP address you want to block.</FieldDescription>
                            <FieldGroup>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="ipAddress"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="ip-field-ipAddress">
                                                    <FieldLabelContent label={"IP Address"} tooltipText="Enter a valid IPv4 or IPv6 address to block." required />
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="ip-field-ipAddress"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="192.168.1.1"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="cidrRange"
                                        control={form.control}
                                        render={({ field, fieldState }) => {
                                            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const filtered = e.target.value.replace(/\D/g, "").slice(0, 3)

                                                const numericValue = Number(filtered);
                                                if (numericValue > 128) {
                                                    field.onChange(128);
                                                } else {
                                                    field.onChange(numericValue);
                                                }
                                            }

                                            return (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="ip-field-cidrRange">
                                                        <FieldLabelContent label={"CIDR Range"} tooltipText="Specify the CIDR range for the IP block (e.g., /24 for IPv4, /64 for IPv6)." />
                                                    </FieldLabel>
                                                    <InputGroup>
                                                        <InputGroupAddon>
                                                            <InputGroupText>/</InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            {...field}
                                                            id="ip-field-cidrRange"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder="32"
                                                            inputMode="numeric"
                                                            maxLength={3}
                                                            value={field.value ?? ''}
                                                            onChange={handleChange}
                                                            autoComplete="off"
                                                        />
                                                    </InputGroup>

                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />
                                </div>
                            </FieldGroup>
                        </FieldSet>
                        <FieldSeparator />
                        <FieldSet>
                            <FieldLegend>Block Details</FieldLegend>
                            <FieldDescription>
                                Specify the block parameters and reason for blocking the IP.
                            </FieldDescription>
                            <FieldGroup>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="scope"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="ip-field-scope">
                                                    <FieldLabelContent label={"Scope"} tooltipText="Select the scope of the block: Global or Service-specific." required />
                                                </FieldLabel>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                <Select
                                                    name={field.name}
                                                    value={field.value ?? ''}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id="ip-field-scope"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select scope" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="global">Global</SelectItem>
                                                        <SelectItem value="service">Service</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                    {scope === "service" && (
                                        <Controller
                                            name="serviceName"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="ip-field-serviceName">
                                                        <FieldLabelContent label={"Service Name"} tooltipText="Specify the name of the service for service-specific blocks." />
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        id="ip-field-serviceName"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Auth-Service"
                                                        autoComplete="off"
                                                        value={field.value ?? ''}
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    )}
                                    <Controller
                                        name="blockType"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="ip-field-blockType">
                                                    <FieldLabelContent label={"Block Type"} tooltipText="Choose whether the block is temporary or permanent." required />
                                                </FieldLabel>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                <Select
                                                    name={field.name}
                                                    value={field.value ?? ''}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id="ip-field-blockType"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select block type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="temporary">Temporary</SelectItem>
                                                        <SelectItem value="permanent">Permanent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                    {blockType === "temporary" && (
                                        <Controller
                                            name="expiresAt"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="ip-field-expiresAt">
                                                        <FieldLabelContent label={"Expires At"} tooltipText="Select the expiration date and time for the temporary block." required />
                                                    </FieldLabel>
                                                    <DateTimePicker
                                                        id="ip-field-expiresAt"
                                                        value={field.value ?? undefined}
                                                        onChange={(v) => {
                                                            field.onChange(v)
                                                        }}
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    )}
                                    <Controller
                                        name="reason"
                                        control={form.control}
                                        render={({ field, fieldState }) => {
                                            const [openReason, setOpenReason] = React.useState(false)

                                            return (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="ip-field-reason">
                                                        <FieldLabelContent label={"Reason"} tooltipText="Select the reason for blocking the IP." required />
                                                    </FieldLabel>
                                                    <Popover open={openReason} onOpenChange={setOpenReason}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                id="ip-field-reason"
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={openReason}
                                                                className={cn("w-full justify-between text-muted-foreground font-normal", fieldState.invalid && "ring-destructive")}
                                                            >
                                                                {field.value ? field.value : "Select reason"}
                                                                <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="start" className="w-full p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search reason..." className="h-9" />
                                                                <CommandList
                                                                    className="max-h-48 overflow-auto custom-scrollbar"
                                                                    onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                                                                        // ensure mouse wheel scrolls the single scroll container
                                                                        e.currentTarget.scrollTop += e.deltaY
                                                                    }}
                                                                >
                                                                    <CommandEmpty>No reason found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {blockReasonLabels.map((r) => (
                                                                            <CommandItem
                                                                                key={r}
                                                                                value={r}
                                                                                onSelect={(currentValue) => {
                                                                                    field.onChange(currentValue)
                                                                                    setOpenReason(false)
                                                                                }}
                                                                            >
                                                                                {r}
                                                                                <Check className={cn("ml-auto", field.value === r ? "opacity-100" : "opacity-0")} />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="severity"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="ip-field-severity">
                                                    <FieldLabelContent label={"Severity"} tooltipText="Select the severity level of the block." required />
                                                </FieldLabel>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                <Select
                                                    name={field.name}
                                                    value={field.value != null ? String(field.value) : ''}
                                                    onValueChange={(value) => field.onChange(Number(value))}      >
                                                    <SelectTrigger
                                                        id="ip-field-severity"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select severity" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1 - Low</SelectItem>
                                                        <SelectItem value="2">2 - Moderate</SelectItem>
                                                        <SelectItem value="3">3 - Elevated</SelectItem>
                                                        <SelectItem value="4">4 - High</SelectItem>
                                                        <SelectItem value="5">5 - Critical</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="reasonNotes"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="col-span-1 sm:col-span-2">
                                                <FieldLabel htmlFor="ip-field-reasonNotes">
                                                    <FieldLabelContent label={"Block Reason Notes"} tooltipText="Provide additional details about the block reason." />
                                                </FieldLabel>
                                                <Textarea
                                                    {...field}
                                                    id="ip-field-reasonNotes"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Provide additional details about the block reason..."
                                                    className="min-h-30"
                                                    value={field.value ?? ''}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <div className="flex justify-end gap-4 mt-7">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            Add Blocked IP
                        </Button>
                    </div>
                </form>
            </ScrollArea>
        </div>
    )
}