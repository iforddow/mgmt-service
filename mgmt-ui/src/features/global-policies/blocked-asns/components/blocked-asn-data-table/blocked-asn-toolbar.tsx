import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { Plus, MoreHorizontal, Download, Upload, RefreshCw } from "lucide-react";
import { DataTableViewOptions } from "@/components/custom/data-table/data-table-coumn-toggle";
import type { BlockedAsnType } from "../../types/blocked-asn-type";
import { BlockedAsnAdvancedFilter } from "./blocked-asn-advanced-filter";

interface BlockedAsnToolbarProps {
    table: Table<BlockedAsnType>;
    initialColumnVisibility: Record<string, boolean>;
    data: BlockedAsnType[];
}

export function BlockedAsnToolbar({ table, initialColumnVisibility, data }: BlockedAsnToolbarProps) {

    const handleAddNew = () => {
        // TODO: Implement add new blocked ASN
        console.log("Add new blocked ASN");
    };

    const handleExport = () => {
        // TODO: Implement export
        console.log("Export blocked ASNs");
    };

    const handleImport = () => {
        // TODO: Implement import
        console.log("Import blocked ASNs");
    };

    const handleRefresh = () => {
        // TODO: Implement refresh
        console.log("Refresh blocked ASNs");
    };

    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-4">
                <Button onClick={handleAddNew} size="sm">
                    <Plus className="size-4" />
                    Add Blocked ASN
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <BlockedAsnAdvancedFilter table={table} data={data} />
                <DataTableViewOptions table={table} initialColumnVisibility={initialColumnVisibility} />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <MoreHorizontal className="size-4" />
                            Actions
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleRefresh}>
                            <RefreshCw className="size-4" />
                            Refresh
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleExport}>
                            <Download className="size-4" />
                            Export
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleImport}>
                            <Upload className="size-4" />
                            Import
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
