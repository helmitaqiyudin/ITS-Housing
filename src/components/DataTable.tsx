import * as React from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, type SortingState, getSortedRowModel, type ColumnFiltersState, getFilteredRowModel, } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { NativeSelect, TextInput } from "@mantine/core";
import { Button } from "~/components/ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const filteroptions = [
        { value: "blok", label: "Blok" },
        { value: "user", label: "Nama Penghuni" },
        { value: "alamat", label: "Alamat" },
    ]

    const [filter, setFilter] = React.useState(filteroptions[0]?.value)
    const [filterValue, setFilterValue] = React.useState("")

    const handleChangeFilter = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        setFilterValue("");
        table.getColumn(selectedFilter?.split('.')[0] ?? "")?.setFilterValue("");

        table.getColumn("blok")?.setFilterValue("");
        table.getColumn("user")?.setFilterValue("");
        table.getColumn("alamat")?.setFilterValue("");
        
    }

    const handleChangeFilterValue = (event : React.ChangeEvent<HTMLInputElement>) => {
        const selectedFilterValue = event.target.value;
        setFilterValue(selectedFilterValue);
        table.getColumn(filter?.split('.')[0] ?? "")?.setFilterValue(selectedFilterValue);
    }

    return (
        <div>
            <div className="flex items-center py-4 gap-5">
                <NativeSelect
                    className="max-w-sm"
                    value={filter}
                    onChange={(event) => handleChangeFilter(event)}
                >
                    {filteroptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </NativeSelect>
                <TextInput
                    placeholder={`Filter by ${filteroptions.find((option) => option.value === filter)?.label}`}
                    value={filterValue}
                    onChange={(event) => handleChangeFilterValue(event)}
                    className="max-w-sm w-full"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                        <TableCell key={cell.id}>
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}