import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState, useMemo } from "react";

interface CidrFilterProps {
    selectedCidrs: string[];
    onCidrChange: (cidrs: string[]) => void;
}

// Generate CIDR options from 1 to 128
const cidrOptions = Array.from({ length: 128 }, (_, i) => ({
    value: String(i + 1),
    label: `/${i + 1}`,
}));

export default function CidrFilter({ selectedCidrs, onCidrChange }: CidrFilterProps) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const filteredOptions = useMemo(() => {
        if (!searchValue) return cidrOptions;
        return cidrOptions.filter((option) =>
            option.label.includes(searchValue) || option.value.includes(searchValue)
        );
    }, [searchValue]);

    const toggleCidr = (cidr: string) => {
        if (selectedCidrs.includes(cidr)) {
            onCidrChange(selectedCidrs.filter((c) => c !== cidr));
        } else {
            onCidrChange([...selectedCidrs, cidr]);
        }
    };

    const removeCidr = (cidr: string) => {
        onCidrChange(selectedCidrs.filter((c) => c !== cidr));
    };

    return (
        <div>
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
                CIDR Range
            </span>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal text-muted-foreground"
                    >
                        {selectedCidrs.length > 0
                            ? `${selectedCidrs.length} selected`
                            : "Select CIDR ranges"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 custom-scrollbar" align="start">
                    <Command>
                        <CommandInput
                            placeholder="Search CIDR..."
                            value={searchValue}
                            onValueChange={setSearchValue}
                        />
                        <CommandList>
                            <CommandEmpty>No CIDR found.</CommandEmpty>
                            <CommandGroup>
                                {filteredOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => toggleCidr(option.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedCidrs.includes(option.value) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {selectedCidrs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedCidrs.map((cidr) => (
                        <Badge key={cidr} variant="secondary" className="gap-1 pr-1">
                            /{cidr}
                            <button
                                type="button"
                                onClick={() => removeCidr(cidr)}
                                className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                                aria-label={`Remove /${cidr}`}
                            >
                                <X className="size-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}