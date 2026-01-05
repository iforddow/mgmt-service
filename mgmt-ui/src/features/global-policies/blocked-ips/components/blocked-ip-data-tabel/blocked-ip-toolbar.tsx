import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import type { BlockedIpType } from "../../types/blocked-ip-type";
import { MoreHorizontal, Download, Upload, RefreshCw } from "lucide-react";
import { DataTableViewOptions } from "@/components/custom/data-table/data-table-coumn-toggle";
import AddBlockedIpButton from "../add-blocked-ip-form/add-blocked-ip-button";

interface BlockedIpToolbarProps {
    table: Table<BlockedIpType>;
    initialColumnVisibility: Record<string, boolean>;
}

export function BlockedIpToolbar({ table, initialColumnVisibility }: BlockedIpToolbarProps) {

    const handleExport = () => {
        // TODO: Implement export
        console.log("Export blocked IPs");
    };

    const handleImport = () => {
        // TODO: Implement import
        console.log("Import blocked IPs");
    };

    const handleRefresh = () => {
        // TODO: Implement refresh
        console.log("Refresh blocked IPs");
    };

    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-4">
                <AddBlockedIpButton />
            </div>
            <div className="flex items-center gap-2">
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
