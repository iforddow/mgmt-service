import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { MeterBar } from "@/components/custom/meter-bar";
import { IconCheck, IconX } from "@tabler/icons-react";
import type { BlockedAsnType } from "../../types/blocked-asn-type";

export const blockedAsnColumns: ColumnDef<BlockedAsnType>[] = [
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
        accessorKey: 'asn',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="ASN #" />
            )
        }
        ,
        filterFn: (row, id, filterValue: string) => {
            if (!filterValue) return true;
            const val = row.getValue(id);
            return String(val).includes(String(filterValue));
        },
    },
    {
        accessorKey: 'asnName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="ASN Name" />
            )
        }
        ,
        filterFn: (row, id, filterValue: string) => {
            if (!filterValue) return true;
            const val = row.getValue(id) as string | number;
            return String(val).toLowerCase().includes(String(filterValue).toLowerCase());
        },
    },
    {
        accessorKey: 'asnOrg',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="ASN Organization" />
            )
        }
        ,
        filterFn: (row, id, filterValue: string) => {
            if (!filterValue) return true;
            const val = row.getValue(id) as string | number;
            return String(val).toLowerCase().includes(String(filterValue).toLowerCase());
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
    },
    {
        id: 'isExpired',
        accessorFn: (row) => row.expiresAt ?? null,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Expired" />
            )
        },
        cell: ({ getValue }) => {
            const expiresAt = getValue() as string | null;
            const isExpired = expiresAt ? new Date(expiresAt) <= new Date() : false;
            return isExpired ? <IconCheck size={16} color="green" /> : <IconX size={16} color="red" />;
        },
        filterFn: (row, id, filterValue: boolean) => {
            const expiresAt = row.getValue(id) as string | null;
            const isExpired = expiresAt ? new Date(expiresAt) <= new Date() : false;
            if (filterValue === null) return true;
            return isExpired === filterValue;
        },
        sortingFn: (rowA, rowB, id) => {
            const expiresAtA = rowA.getValue(id) as string | null;
            const isExpiredA = expiresAtA ? new Date(expiresAtA) <= new Date() : false;
            const expiresAtB = rowB.getValue(id) as string | null;
            const isExpiredB = expiresAtB ? new Date(expiresAtB) <= new Date() : false;
            return (isExpiredA === isExpiredB) ? 0 : isExpiredA ? -1 : 1;
        },
    }
];