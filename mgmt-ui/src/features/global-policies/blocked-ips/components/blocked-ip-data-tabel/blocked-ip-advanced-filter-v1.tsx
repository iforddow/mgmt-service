import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import type { Table } from "@tanstack/react-table";
import { Filter, X, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlockedIpType } from "../../types/blocked-ip-type";
import { Badge } from "@/components/ui/badge";

interface BlockedIpAdvancedFilterProps {
    table: Table<BlockedIpType>;
    data: BlockedIpType[];
    onFilterChange?: (filter: string | null) => void;
}

interface FilterState {
    ipRange: string;
    cidrRanges: string[];
    scopes: string[];
    serviceNames: string[];
    reasons: string[];
    blockTypes: string[];
    severityRange: [number, number];
    createdByOptions: string[];
    isExpired: "all" | "expired" | "active";
}

const defaultFilterState: FilterState = {
    ipRange: "",
    cidrRanges: [],
    scopes: [],
    serviceNames: [],
    reasons: [],
    blockTypes: [],
    severityRange: [1, 5],
    createdByOptions: [],
    isExpired: "all",
};

export function BlockedIpAdvancedFilterOld({ table, data, onFilterChange }: BlockedIpAdvancedFilterProps) {
    const [open, setOpen] = useState(false);
    // `filters` are the currently applied filters (what the table uses)
    const [filters, setFilters] = useState<FilterState>(defaultFilterState);
    // `draftFilters` are edited in the UI and only applied when the user clicks Apply
    const [draftFilters, setDraftFilters] = useState<FilterState>(defaultFilterState);

    // Extract unique values from data for filter options
    const filterOptions = useMemo(() => {
        const cidrRanges = [...new Set(data.map((d) => d.cidrRange).filter((c): c is NonNullable<typeof c> => c != null).map(String))].sort();
        const scopes = [...new Set(data.map((d) => d.scope))].sort();
        const serviceNames = [...new Set(data.map((d) => d.serviceName).filter((s): s is string => s != null))].sort();
        const reasons = [...new Set(data.map((d) => d.reason))].sort();
        const blockTypes = [...new Set(data.map((d) => d.blockType))].sort();
        const createdByOptions = [...new Set(data.map((d) => d.createdBy))].sort();

        return {
            cidrRanges,
            scopes,
            serviceNames,
            reasons,
            blockTypes,
            createdByOptions,
        };
    }, [data]);

    // Count active (APPLIED) filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.ipRange) count++;
        if (filters.cidrRanges.length > 0) count++;
        if (filters.scopes.length > 0) count++;
        if (filters.serviceNames.length > 0) count++;
        if (filters.reasons.length > 0) count++;
        if (filters.blockTypes.length > 0) count++;
        if (filters.severityRange[0] !== 1 || filters.severityRange[1] !== 5) count++;
        if (filters.createdByOptions.length > 0) count++;
        if (filters.isExpired !== "all") count++;
        return count;
    }, [filters]);

    // Helper to build filter string and emit via callback
    const emitFilters = (f: FilterState) => {
        const parts: string[] = [];
        if (f.ipRange) parts.push(f.ipRange);
        if (f.cidrRanges.length) parts.push(...f.cidrRanges);
        if (f.scopes.length) parts.push(...f.scopes);
        if (f.serviceNames.length) parts.push(...f.serviceNames);
        if (f.reasons.length) parts.push(...f.reasons);
        if (f.blockTypes.length) parts.push(...f.blockTypes);
        if (f.createdByOptions.length) parts.push(...f.createdByOptions);
        if (f.severityRange[0] !== 1 || f.severityRange[1] !== 5)
            parts.push(`${f.severityRange[0]}-${f.severityRange[1]}`);
        if (f.isExpired !== "all") parts.push(f.isExpired);

        const filterString = parts.join(",");
        if (onFilterChange) {
            onFilterChange(filterString.length ? filterString : null);
        }
    };

    // Reset applied filters (clears what's currently active)
    const resetFilters = () => {
        setFilters(defaultFilterState);
        setDraftFilters(defaultFilterState);
        table.resetColumnFilters();
        if (onFilterChange) onFilterChange(null);
    };

    // Reset only the draft (UI) filters without applying
    const resetDraft = () => {
        setDraftFilters(filters);
    };

    const toggleArrayFilter = (
        key: keyof Pick<FilterState, "cidrRanges" | "scopes" | "serviceNames" | "reasons" | "blockTypes" | "createdByOptions">,
        value: string
    ) => {
        setDraftFilters((prev) => {
            const current = prev[key];
            const newValues = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [key]: newValues };
        });
    };

    return (
        <Popover
            open={open}
            onOpenChange={(val) => {
                if (val) setDraftFilters(filters);
                setOpen(val);
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                    <Filter className="size-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {activeFilterCount > 0 && (
                        <Badge variant="default" className="flex items-center h-5 w-5 text-xs">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-70 md:w-100 max-h-125 overflow-y-auto custom-scrollbar" align="end">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-sm">Advanced Filters</h4>
                    <div className="flex items-center gap-2">
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => {
                                    // Clear applied filters immediately
                                    resetFilters();
                                }}
                            >
                                <RotateCcw className="size-3 mr-1" />
                                Clear
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => resetDraft()}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setOpen(false)}
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* IP Range Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            IP Address
                        </Label>
                        <Input
                            placeholder="Filter by IP address..."
                            value={draftFilters.ipRange}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({ ...prev, ipRange: e.target.value }))
                            }
                            className="h-8"
                        />
                    </div>

                    <Separator />

                    {/* CIDR Range Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            CIDR Range
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.cidrRanges.map((cidr) => (
                                <label
                                    key={cidr}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.cidrRanges.includes(cidr)}
                                        onCheckedChange={() => toggleArrayFilter("cidrRanges", cidr)}
                                        className="h-4 w-4"
                                    />
                                    <span>{cidr}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Scope Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Scope
                        </Label>
                        <div className="flex flex-wrap gap-3">
                            {filterOptions.scopes.map((scope) => (
                                <label
                                    key={scope}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.scopes.includes(scope)}
                                        onCheckedChange={() => toggleArrayFilter("scopes", scope)}
                                        className="h-4 w-4"
                                    />
                                    <span className="capitalize">{scope}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Block Type Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Block Type
                        </Label>
                        <div className="flex flex-wrap gap-3">
                            {filterOptions.blockTypes.map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.blockTypes.includes(type)}
                                        onCheckedChange={() => toggleArrayFilter("blockTypes", type)}
                                        className="h-4 w-4"
                                    />
                                    <span className="capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Severity Filter */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Severity
                            </Label>
                            <span className="text-xs text-muted-foreground">
                                {draftFilters.severityRange[0]} - {draftFilters.severityRange[1]}
                            </span>
                        </div>
                        <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={draftFilters.severityRange}
                            onValueChange={(value) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    severityRange: value as [number, number],
                                }))
                            }
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low (1)</span>
                            <span>High (5)</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Service Name Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Service Name
                        </Label>
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                            {filterOptions.serviceNames.map((service) => (
                                <label
                                    key={service}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.serviceNames.includes(service)}
                                        onCheckedChange={() =>
                                            toggleArrayFilter("serviceNames", service)
                                        }
                                        className="h-4 w-4"
                                    />
                                    <span>{service}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Created By Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Created By
                        </Label>
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                            {filterOptions.createdByOptions.map((creator) => (
                                <label
                                    key={creator}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.createdByOptions.includes(creator)}
                                        onCheckedChange={() =>
                                            toggleArrayFilter("createdByOptions", creator)
                                        }
                                        className="h-4 w-4"
                                    />
                                    <span className="capitalize">{creator}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Expired Status Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Expired
                        </Label>
                        <div className="flex gap-3">
                            {(["all", "active", "expired"] as const).map((status) => (
                                <label
                                    key={status}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={draftFilters.isExpired === status}
                                        onCheckedChange={() =>
                                            setDraftFilters((prev) => ({ ...prev, isExpired: status }))
                                        }
                                        className="h-4 w-4 rounded-full"
                                    />
                                    <span className="capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer actions: Cancel / Reset Draft / Apply */}
                <div className="flex items-center justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            // Cancel: discard draft changes
                            setDraftFilters(filters);
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            // Reset draft only
                            setDraftFilters(defaultFilterState);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => {
                            // Apply draft -> becomes active filters
                            setFilters(draftFilters);
                            emitFilters(draftFilters);
                            setOpen(false);
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
