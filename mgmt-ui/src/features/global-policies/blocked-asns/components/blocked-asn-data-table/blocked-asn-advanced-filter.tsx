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
import { useMemo, useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import type { BlockedAsnType } from "../../types/blocked-asn-type";

interface BlockedAsnAdvancedFilterProps {
    table: Table<BlockedAsnType>;
    data: BlockedAsnType[];
}

interface FilterState {
    asn: string;
    asnName: string;
    asnOrg: string;
    scopes: string[];
    serviceNames: string[];
    reasons: string[];
    blockTypes: string[];
    severityRange: [number, number];
    createdByOptions: string[];
    isExpired: "all" | "expired" | "active";
}

const defaultFilterState: FilterState = {
    asn: "",
    asnName: "",
    asnOrg: "",
    scopes: [],
    serviceNames: [],
    reasons: [],
    blockTypes: [],
    severityRange: [1, 5],
    createdByOptions: [],
    isExpired: "all",
};

export function BlockedAsnAdvancedFilter({ table, data }: BlockedAsnAdvancedFilterProps) {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>(defaultFilterState);

    // Extract unique values from data for filter options
    const filterOptions = useMemo(() => {
        const scopes = [...new Set(data.map((d) => d.scope))].sort();
        const serviceNames = [...new Set(data.map((d) => d.serviceName))].sort();
        const reasons = [...new Set(data.map((d) => d.reason))].sort();
        const blockTypes = [...new Set(data.map((d) => d.blockType))].sort();
        const createdByOptions = [...new Set(data.map((d) => d.createdBy))].sort();

        return {
            scopes,
            serviceNames,
            reasons,
            blockTypes,
            createdByOptions,
        };
    }, [data]);

    // Count active filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.asn) count++;
        if (filters.asnName) count++;
        if (filters.asnOrg) count++;
        if (filters.scopes.length > 0) count++;
        if (filters.serviceNames.length > 0) count++;
        if (filters.reasons.length > 0) count++;
        if (filters.blockTypes.length > 0) count++;
        if (filters.severityRange[0] !== 1 || filters.severityRange[1] !== 5) count++;
        if (filters.createdByOptions.length > 0) count++;
        if (filters.isExpired !== "all") count++;
        return count;
    }, [filters]);

    // Apply filters to table
    const applyFilters = useCallback(() => {
        // Clear all existing column filters first
        table.resetColumnFilters();

        // Apply ASN filter
        if (filters.asn) {
            table.getColumn("asn")?.setFilterValue(filters.asn);
        }

        if (filters.asnName) {
            table.getColumn("asnName")?.setFilterValue(filters.asnName);
        }

        if (filters.asnOrg) {
            table.getColumn("asnOrg")?.setFilterValue(filters.asnOrg);
        }

        // Set up custom filter function for array-based filters
        table.setColumnFilters((prev) => {
            const newFilters = [...prev];

            // Scope filter
            if (filters.scopes.length > 0) {
                newFilters.push({
                    id: "scope",
                    value: filters.scopes,
                });
            }

            // Service Name filter
            if (filters.serviceNames.length > 0) {
                newFilters.push({
                    id: "serviceName",
                    value: filters.serviceNames,
                });
            }

            // Block Type filter
            if (filters.blockTypes.length > 0) {
                newFilters.push({
                    id: "blockType",
                    value: filters.blockTypes,
                });
            }

            // Severity filter
            if (filters.severityRange[0] !== 1 || filters.severityRange[1] !== 5) {
                newFilters.push({
                    id: "severity",
                    value: filters.severityRange,
                });
            }

            // Created By filter
            if (filters.createdByOptions.length > 0) {
                newFilters.push({
                    id: "createdBy",
                    value: filters.createdByOptions,
                });
            }

            // Is Active filter
            if (filters.isExpired !== "all") {
                newFilters.push({
                    id: "isExpired",
                    value: filters.isExpired === "active",
                });
            }

            return newFilters;
        });
    }, [table, filters]);

    // Apply filters when they change
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const resetFilters = () => {
        setFilters(defaultFilterState);
        table.resetColumnFilters();
    };

    const toggleArrayFilter = (
        key: keyof Pick<FilterState, "scopes" | "serviceNames" | "reasons" | "blockTypes" | "createdByOptions">,
        value: string
    ) => {
        setFilters((prev) => {
            const current = prev[key];
            const newValues = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [key]: newValues };
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
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
            <PopoverContent className="w-100 max-h-125 overflow-y-auto custom-scrollbar" align="end">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-sm">Advanced Filters</h4>
                    <div className="flex items-center gap-2">
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={resetFilters}
                            >
                                <RotateCcw className="size-3 mr-1" />
                                Reset
                            </Button>
                        )}
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
                    {/* ASN Range Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            ASN #
                        </Label>
                        <Input
                            placeholder="Filter by ASN number..."
                            value={filters.asn}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, asn: e.target.value }))
                            }
                            className="h-8"
                        />
                    </div>

                    <Separator />

                    {/* ASN Name Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            ASN Name
                        </Label>
                        <Input
                            placeholder="Filter by ASN name..."
                            value={filters.asnName}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, asnName: e.target.value }))
                            }
                            className="h-8"
                        />
                    </div>

                    <Separator />
                    {/* ASN Organization Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            ASN Organization
                        </Label>
                        <Input
                            placeholder="Filter by ASN organization..."
                            value={filters.asnOrg}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, asnOrg: e.target.value }))
                            }
                            className="h-8"
                        />
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
                                        checked={filters.scopes.includes(scope)}
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
                                        checked={filters.blockTypes.includes(type)}
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
                                {filters.severityRange[0]} - {filters.severityRange[1]}
                            </span>
                        </div>
                        <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={filters.severityRange}
                            onValueChange={(value) =>
                                setFilters((prev) => ({
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
                                        checked={filters.serviceNames.includes(service)}
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
                                        checked={filters.createdByOptions.includes(creator)}
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

                    {/* Active Status Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Expired
                        </Label>
                        <div className="flex gap-3">
                            {(["all", "expired", "active"] as const).map((status) => (
                                <label
                                    key={status}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={filters.isExpired === status}
                                        onCheckedChange={() =>
                                            setFilters((prev) => ({ ...prev, isExpired: status }))
                                        }
                                        className="h-4 w-4 rounded-full"
                                    />
                                    <span className="capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
