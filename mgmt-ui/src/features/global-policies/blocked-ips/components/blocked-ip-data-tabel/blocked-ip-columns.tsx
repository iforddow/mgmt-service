import type { ColumnDef } from "@tanstack/react-table";
import type { BlockedIpType } from "../../types/blocked-ip-type";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { MeterBar } from "@/components/custom/meter-bar";
import { IconBinoculars } from "@tabler/icons-react";

export const blockedIpColumns: ColumnDef<BlockedIpType>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'ipAddress',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="IP Address" />
            )
        },
        cell: ({ row }) => {
            const ipAddress = row.getValue('ipAddress') as string;
            return (
                <div className="flex items-center">
                    <p>{ipAddress}</p>
                    <a href={'/ip-lookup?ipAddress=' + ipAddress} className="inline-flex cursor-pointer select-none items-center justify-center rounded-sm p-1 opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        <IconBinoculars className="size-4" title="Lookup IP" />
                    </a>
                </div>
            );
        }
    },
    {
        accessorKey: 'cidrRange',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="CIDR Range" />
            )
        },
        filterFn: (row, id, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'scope',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Scope" />
            )
        },
        cell: ({ row }) => {
            const scope = row.getValue('scope') as string;
            return scope.charAt(0).toUpperCase() + scope.slice(1);
        },
        filterFn: (row, id, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'serviceName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Service Name" />
            )
        },
        filterFn: (row, id, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'reason',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reason" />
            )
        },
    },
    {
        accessorKey: 'reasonNotes',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reason Notes" />
            )
        },
        cell: ({ row }) => {
            const reasonNotes = row.getValue('reasonNotes') as string | null;
            return <div className="max-w-100 overflow-hidden text-ellipsis">{reasonNotes ? reasonNotes : '-'}</div>;
        }
    },
    {
        accessorKey: 'blockType',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Block Type" />
            )
        },
        cell: ({ row }) => {
            const blockType = row.getValue('blockType') as string;
            return blockType.charAt(0).toUpperCase() + blockType.slice(1);
        },
        filterFn: (row, id, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'severity',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Severity" />
            )
        },
        cell: ({ row }) => {
            const severity = row.getValue('severity') as 1 | 2 | 3 | 4 | 5;

            return (<MeterBar value={severity} />);
        },
        filterFn: (row, id, filterValue: [number, number]) => {
            if (!filterValue) return true;
            const severity = row.getValue(id) as number;
            return severity >= filterValue[0] && severity <= filterValue[1];
        },
    },
    {
        accessorKey: 'blockedAt',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Blocked At" />
            )
        },
        cell: ({ row }) => {
            const blockedAt = row.getValue('blockedAt') as string;
            return new Date(blockedAt).toLocaleString();
        }
    },
    {
        accessorKey: 'expiresAt',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Expires At" />
            )
        },
        cell: ({ row }) => {
            const expiresAt = row.getValue('expiresAt') as string | null;
            return expiresAt ? new Date(expiresAt).toLocaleString() : 'Never';
        },
    },
    {
        accessorKey: 'createdBy',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Created By" />
            )
        },
        cell: ({ row }) => {
            const createdBy = row.getValue('createdBy') as string;
            return createdBy.charAt(0).toUpperCase() + createdBy.slice(1);
        },
        filterFn: (row, id, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'hitCount',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Hit Count" />
            )
        },
    }
];