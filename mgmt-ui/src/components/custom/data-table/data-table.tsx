import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    toolbar?: (table: ReturnType<typeof useReactTable<TData>>, initialColumnVisibility: VisibilityState, data: TData[]) => React.ReactNode
    initialColumnVisibility?: VisibilityState,
    filterComponent?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode
    pageInfo?: any
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    toolbar,
    initialColumnVisibility = {},
    filterComponent,
    pageInfo,
}: DataTableProps<TData, TValue>) {

    // Sorting state
    const [sorting, setSorting] = useState<SortingState>([])

    // Column filters state
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    // Column visibility state
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility)

    // Row selection state
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (

        <div className="flex gap-4">
            {filterComponent && filterComponent(table)}
            <div className="flex flex-col gap-4 w-full">
                {toolbar && toolbar(table, initialColumnVisibility, data)}
                <div className="overflow-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="p-4">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="p-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination table={table} pageInfo={pageInfo} />
            </div>
        </div>

    )
}