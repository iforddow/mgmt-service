"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { type Table, type VisibilityState } from "@tanstack/react-table"
import { Columns3, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export function DataTableViewOptions<TData>({
    table,
    initialColumnVisibility = {},
}: {
    table: Table<TData>
    initialColumnVisibility?: VisibilityState
}) {

    const formatColumnId = (id: string) => {
        const acronyms = ['ip', 'id', 'url', 'api', 'uuid', 'asn', 'http', 'https', 'dns', 'ssl', 'tls'];

        return id
            // Insert space before uppercase letters (camelCase/PascalCase)
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // Replace underscores and hyphens with spaces
            .replace(/[_-]/g, ' ')
            // Capitalize first letter of each word, uppercase known acronyms
            .split(' ')
            .map(word => acronyms.includes(word.toLowerCase())
                ? word.toUpperCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim();
    }

    const idToColumnName = (id: string) => {
        const column = table.getColumn(id);
        const header = column?.columnDef.header;
        return typeof header === "string" ? header : formatColumnId(id);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 flex gap-2"
                >
                    <Columns3 className="h-4 w-4" />
                    <span className="hidden lg:flex">Columns</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Toggle columns
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <label
                                    key={column.id}
                                    className="flex items-center gap-3 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent transition-colors"
                                >
                                    <Checkbox
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        className="h-4 w-4"
                                    />
                                    <span>{idToColumnName(column.id)}</span>
                                </label>
                            )
                        })}
                </div>
                <DropdownMenuSeparator />
                <div className="p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-8 text-muted-foreground hover:text-foreground"
                        onClick={() => table.setColumnVisibility(initialColumnVisibility)}
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset to default
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
