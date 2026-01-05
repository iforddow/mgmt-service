import { Slider } from "@/components/ui/slider";

export default function SeverityFilter({ severityRange, onSeverityRangeChange }: { severityRange: [number, number], onSeverityRangeChange: (newRange: [number, number]) => void }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground block">
                    Severity
                </span>
                <span className="text-xs text-muted-foreground">
                    {severityRange[0]} - {severityRange[1]}
                </span>
            </div>
            <Slider
                min={1}
                max={5}
                step={1}
                value={severityRange}
                onValueChange={(value) => {

                    onSeverityRangeChange(value as [number, number]);

                }}
                className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low (1)</span>
                <span>Critical (5)</span>
            </div>
        </div>
    );
}