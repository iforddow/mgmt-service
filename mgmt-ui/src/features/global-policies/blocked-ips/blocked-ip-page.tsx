import BaseLayout from "@/components/layout/base-layout";
import { blockedIpColumns } from "./components/blocked-ip-data-tabel/blocked-ip-columns";
import DataTable from "@/components/custom/data-table/data-table";
import { BlockedIpToolbar } from "./components/blocked-ip-data-tabel/blocked-ip-toolbar";
import { useBlockedIps } from "./services/blocked-ip-service";
import type { BlockedIpType } from "./types/blocked-ip-type";
import { useState } from "react";
import { BlockedIpAdvancedFilter, defaultFilterState, type BlockedIpFilterState } from "./components/blocked-ip-data-tabel/filter/blocked-ip-advanced-filter";
import { processFilters } from "./components/blocked-ip-data-tabel/filter/service/filter-processor";

export default function BlockedIpPage() {

    const [filterString, setFilterString] = useState<string | null>(null);
    const [filters, setFilters] = useState<BlockedIpFilterState>(defaultFilterState);

    const { data: blockedIps, isLoading, error } = useBlockedIps(0, 10, true, filterString);

    return (
        <BaseLayout title="Blocked IPs">
            {blockedIps && (
                <DataTable
                    columns={blockedIpColumns}
                    pageInfo={blockedIps}
                    data={blockedIps.content as BlockedIpType[]}
                    initialColumnVisibility={{
                        cidrRange: false, serviceName: false, hitCount: false,
                        createdBy: false, reasonNotes: false
                    }}
                    toolbar={(table, initialColumnVisibility) => (
                        <BlockedIpToolbar
                            table={table}
                            initialColumnVisibility={initialColumnVisibility}
                        />
                    )}
                    filterComponent={(table) => (<BlockedIpAdvancedFilter table={table}
                        data={blockedIps.content as BlockedIpType[]}
                        filters={filters}
                        setFilters={setFilters}
                        onFilterApplied={(appliedFilters) => {
                            if (!appliedFilters) {
                                console.log("Filters reset");
                                setFilterString(null);
                                return;
                            }
                            const result = processFilters(appliedFilters);
                            console.log("Filter result:", result);
                            setFilterString(result);
                        }}
                    />
                    )}
                />
            )}
        </BaseLayout>
    )
}