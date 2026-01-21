import { FieldError, FieldLabel, FieldLabelContent } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordFieldProps {
    field: any;
    fieldState: any;
    id: string;
    label: string;
    tooltipText?: string;
    required?: boolean;
    description?: string;
    className?: string;
}

export default function PasswordInput({
    field,
    fieldState,
    id,
    label,
    tooltipText,
    required,
    description,
    className,
}: PasswordFieldProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <FieldLabel htmlFor={id} className="pt-2 text-sm font-medium">
                <FieldLabelContent label={label} tooltipText={tooltipText} required={required} />
            </FieldLabel>
            <div className="space-y-1.5">
                <InputGroup className={className}>
                    <InputGroupInput
                        {...field}
                        id={id}
                        aria-invalid={fieldState.invalid}
                        placeholder={label}
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                    />
                    <InputGroupAddon align="inline-end">
                        {showPassword ? (
                            <EyeOff onClick={() => setShowPassword(false)} className="h-5 w-5 cursor-pointer text-muted-foreground" />
                        ) : (
                            <Eye onClick={() => setShowPassword(true)} className="h-5 w-5 cursor-pointer text-muted-foreground" />
                        )}
                    </InputGroupAddon>
                </InputGroup>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
        </>
    );
}