import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type MeterVariant = "danger" | "warning" | "success" | "info";

interface MeterBarProps {
    value: 1 | 2 | 3 | 4 | 5;
    variant?: MeterVariant;
    className?: string;
    showLabel?: boolean;
}

const variantColors: Record<MeterVariant, string[]> = {
    danger: [
        "bg-yellow-400",      // Level 1 - Yellow
        "bg-amber-500",       // Level 2 - Amber
        "bg-orange-500",      // Level 3 - Orange
        "bg-red-500",         // Level 4 - Red
        "bg-red-700",         // Level 5 - Dark Red
    ],
    warning: [
        "bg-blue-300",        // Level 1
        "bg-blue-400",        // Level 2
        "bg-yellow-400",      // Level 3
        "bg-amber-500",       // Level 4
        "bg-orange-500",      // Level 5
    ],
    success: [
        "bg-red-400",         // Level 1 - Bad
        "bg-orange-400",      // Level 2
        "bg-yellow-400",      // Level 3
        "bg-lime-500",        // Level 4
        "bg-green-500",       // Level 5 - Good
    ],
    info: [
        "bg-slate-400",       // Level 1
        "bg-blue-300",        // Level 2
        "bg-blue-400",        // Level 3
        "bg-blue-500",        // Level 4
        "bg-blue-600",        // Level 5
    ],
};

const variantLabels: Record<MeterVariant, string[]> = {
    danger: ["Low", "Moderate", "Elevated", "High", "Critical"],
    warning: ["Minimal", "Low", "Medium", "High", "Severe"],
    success: ["Poor", "Fair", "Good", "Great", "Excellent"],
    info: ["1", "2", "3", "4", "5"],
};

export function MeterBar({
    value,
    variant = "danger",
    className,
    showLabel = false,
}: MeterBarProps) {
    const colors = variantColors[variant];
    const labels = variantLabels[variant];
    const defaultColor = "bg-muted";

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <Tooltip key={level}>
                        <TooltipTrigger>
                            <div
                                key={level}
                                className={cn(
                                    "h-2 w-4 rounded-sm transition-colors",
                                    level <= value ? colors[level - 1] : defaultColor
                                )}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{labels[level - 1]}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            {showLabel && (
                <span className="text-xs text-muted-foreground">
                    {labels[value - 1]}
                </span>
            )}
        </div>
    );
}
