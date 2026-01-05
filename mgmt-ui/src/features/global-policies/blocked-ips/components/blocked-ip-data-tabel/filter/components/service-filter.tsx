import { Badge } from "@/components/ui/badge";

interface ServiceFilterProps {
    serviceNames: string[];
    selectedServices: string[];
    onServiceToggle: (serviceName: string) => void;
}

export default function ServiceFilter({ serviceNames, selectedServices, onServiceToggle }: ServiceFilterProps) {
    return (
        <div>
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Service Name
            </span>
            <div className="flex flex-wrap gap-2">
                {serviceNames.map((serviceName) => {
                    const isSelected = selectedServices.includes(serviceName);

                    return (
                        <label
                            key={serviceName}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                            onClick={() => onServiceToggle(serviceName)}
                        >
                            <Badge variant={isSelected ? "default" : "outline"} className="flex items-center gap-2">
                                <span>{serviceName}</span>
                            </Badge>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}