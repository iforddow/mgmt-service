import { type Column } from "@tanstack/react-table"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    const handleSortClick = () => {
        const currentSort = column.getIsSorted()
        if (currentSort === false) {
            column.toggleSorting(false, true)
        } else if (currentSort === "asc") {
            column.toggleSorting(true, true)
        } else {
            column.clearSorting()
        }
    }

    return (
        <div className={cn("flex items-center gap-2 select-none", className)}>
            <span>{title}</span>
            <a
                className="inline-flex cursor-pointer select-none items-center justify-center rounded-sm p-1 opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleSortClick}
            >
                {column.getIsSorted() === "desc" ? (
                    <ChevronDown className="size-4" />
                ) : column.getIsSorted() === "asc" ? (
                    <ChevronUp className="size-4" />
                ) : (
                    <ChevronsUpDown className="size-4" />
                )}
            </a>
        </div>
    )
}
