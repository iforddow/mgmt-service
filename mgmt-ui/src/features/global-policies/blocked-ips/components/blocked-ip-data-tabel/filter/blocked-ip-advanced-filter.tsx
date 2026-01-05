import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import type { BlockedIpType } from "../../../types/blocked-ip-type";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ListCheck, ListRestart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import IpAddressFilter from "./components/ip-address-filter";
import CidrFilter from "./components/cidr-filter";
import ScopeFilter from "./components/scope-filter";
import BlockTypeFilter from "./components/block-filter";
import SeverityFilter from "./components/severity-filter";
import ServiceFilter from "./components/service-filter";

interface BlockedIpAdvancedFilterProps {
    table: Table<BlockedIpType>;
    data: BlockedIpType[];
    filters: BlockedIpFilterState;
    setFilters: React.Dispatch<React.SetStateAction<BlockedIpFilterState>>;
    onFilterApplied: (filter: BlockedIpFilterState | null) => void;
}

export interface BlockedIpFilterState {
    ipList: string[];
    cidrRanges: string[];
    scopes: ("global" | "service")[];
    serviceNames: string[];
    reasons: string[];
    blockTypes: ("permanent" | "temporary")[];
    severityRange: [number, number];
    createdBy: string[];
}

export const defaultFilterState: BlockedIpFilterState = {
    ipList: [],
    cidrRanges: [],
    scopes: [],
    serviceNames: [],
    reasons: [],
    blockTypes: [],
    severityRange: [1, 5],
    createdBy: [],
};

export function BlockedIpAdvancedFilter({ table, data, filters, setFilters, onFilterApplied }: BlockedIpAdvancedFilterProps) {
    // Extract unique values from data for filter options
    const filterOptions = useMemo(() => {
        const serviceNames = [...new Set(data.map((d) => d.serviceName).filter((s): s is string => s != null))].sort();
        const reasons = [...new Set(data.map((d) => d.reason))].sort();
        const blockTypes = [...new Set(data.map((d) => d.blockType))].sort();
        const createdByOptions = [...new Set(data.map((d) => d.createdBy))].sort();

        return {
            serviceNames,
            reasons,
            blockTypes,
            createdByOptions,
        };
    }, [data]);

    // Count active (APPLIED) filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.ipList.length > 0) count++;
        if (filters.cidrRanges.length > 0) count++;
        if (filters.scopes && filters.scopes.length > 0) count++;
        if (filters.serviceNames.length > 0) count++;
        if (filters.reasons.length > 0) count++;
        if (filters.blockTypes.length > 0) count++;
        if (filters.severityRange[0] !== 1 || filters.severityRange[1] !== 5) count++;
        if (filters.createdBy.length > 0) count++;
        return count;
    }, [filters]);

    // Reset applied filters (clears what's currently active)
    const resetFilters = () => {
        setFilters(defaultFilterState);
        if (onFilterApplied) onFilterApplied(null);
    };

    return (
        <div className="w-[20%] bg-accent/50 p-4 rounded-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <IconFilter className="inline-block size-4" />
                    <h2 className="mb-2 size-4 font-medium">Filters</h2>
                </div>
                {activeFilterCount > -1 && (<Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums"><span>{activeFilterCount}</span></Badge>)}
            </div>
            <div className="h-full">
                <Separator />
                <div>
                    <Accordion
                        type="multiple"
                        className="w-full"
                    >
                        {/* IP Filters (Add IP Address and CIDR Range) */}
                        <AccordionItem value="ipFilter">
                            <AccordionTrigger className="rounded-b-none font-normal text-sm hover:no-underline hover:cursor-pointer">
                                IP Filters
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <div className="flex flex-col gap-4">
                                    <IpAddressFilter
                                        ipList={filters.ipList}
                                        onIpAddressAdd={(ip) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                ipList: [...prev.ipList, ip],
                                            }));
                                        }}
                                        onIpAddressRemove={(ip) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                ipList: prev.ipList.filter((i) => i !== ip),
                                            }));
                                        }}
                                    />
                                    <CidrFilter
                                        selectedCidrs={filters.cidrRanges}
                                        onCidrChange={(cidrs) => setFilters((prev) => ({ ...prev, cidrRanges: cidrs }))}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        {/* Scope Filters (Add Scope and Service Name) */}
                        <div className="flex flex-col gap-4 py-4 border-b">
                            <ScopeFilter
                                scopes={filters.scopes}
                                onScopesChange={(newScopes) => setFilters((prev) => ({ ...prev, scopes: newScopes }))}
                            />
                            <BlockTypeFilter
                                blockTypes={filters.blockTypes}
                                onBlockTypesChange={(newBlockTypes) => setFilters((prev) => ({ ...prev, blockTypes: newBlockTypes }))}
                            />
                            <SeverityFilter
                                severityRange={filters.severityRange}
                                onSeverityRangeChange={(newRange) => setFilters((prev) => ({ ...prev, severityRange: newRange }))}
                            />
                            {
                                filterOptions.serviceNames.length > 0 && (
                                    <ServiceFilter
                                        serviceNames={filterOptions.serviceNames}
                                        selectedServices={filters.serviceNames}
                                        onServiceToggle={(serviceName) => {
                                            setFilters((prev) => {
                                                const isSelected = prev.serviceNames.includes(serviceName);
                                                const updatedServiceNames = isSelected
                                                    ? prev.serviceNames.filter((name) => name !== serviceName)
                                                    : [...prev.serviceNames, serviceName];
                                                return { ...prev, serviceNames: updatedServiceNames };
                                            });
                                        }}
                                    />
                                )}
                        </div>
                        {/* Time Filters */}
                        {/* <AccordionItem value="timeFilter">
                            <AccordionTrigger className="rounded-b-none font-normal text-sm hover:no-underline hover:cursor-pointer">
                                Time Filters
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <Label htmlFor="timeFilter" className="mb-2 font-normal text-xs">Add IP Address</Label>
                                        <InputGroup>
                                            <InputGroupInput id="ipInput" placeholder="Enter IP Address" />
                                            <InputGroupAddon>
                                                <Globe />
                                            </InputGroupAddon>
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupButton><Plus /></InputGroupButton>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <Label htmlFor="cidrInput" className="mb-2 font-normal text-xs">Add CIDR Range</Label>
                                        <InputGroup>
                                            <InputGroupInput id="cidrInput" placeholder="Enter a CIDR range" />
                                            <InputGroupAddon>
                                                /
                                            </InputGroupAddon>
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupButton><Plus /></InputGroupButton>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem> */}
                    </Accordion>
                </div>
            </div>
            <Separator />
            <div className="flex gap-4">
                <Button variant={"outline"} size={"sm"} onClick={resetFilters} disabled={activeFilterCount === 0}><ListRestart />Reset Filters</Button>
                <Button variant={"default"} size={"sm"} onClick={() => onFilterApplied && onFilterApplied(filters)} disabled={activeFilterCount === 0}><ListCheck />Apply Filters</Button>
            </div>
        </div>
    );
}
