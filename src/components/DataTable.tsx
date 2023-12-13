import * as React from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, type SortingState, getSortedRowModel, type ColumnFiltersState, getFilteredRowModel, type Row, } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { NativeSelect, TextInput, Modal } from "@mantine/core";
import { Button } from "~/components/ui/button"
import { Button as MantineButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FormCreateHouse from "~/components/admin/rumahnegara/TambahRumah";
import FormCreatePaymentRequest from "./user/ajuan/TambahAjuanPembayaran";
import FormCreateRenovationRequest from "./user/ajuan/TambahAjuanRenovasi";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    refetchData: () => void
    filteroptions: { value: string; label: string }[]
    type: "rumah" | "ajuan"
    buttonlabel?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    refetchData,
    buttonlabel,
    type,
    filteroptions,
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
        filterFns: {
            fuzzy: (value: Row<TData>, filterValue: string) => {
                return JSON.stringify(value)?.toString().toLowerCase().includes(filterValue?.toString().toLowerCase())
            },
            date: (value: Row<TData>, filterValue: string) => {
                return typeof value === 'string' && typeof filterValue === 'string' && (value as string).toLowerCase().includes((filterValue).toLowerCase())
            }
        }
    })

    const [filter, setFilter] = React.useState(filteroptions[0]?.value)
    const [filterValue, setFilterValue] = React.useState("")

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        setFilterValue("");
        table.getColumn(selectedFilter?.split('.')[0] ?? "")?.setFilterValue("");

        table.getAllColumns().forEach((column) => {
            column.setFilterValue("");
        });
    }

    const handleChangeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFilterValue = event.target.value;
        setFilterValue(selectedFilterValue);
        table.getColumn(filter?.split('.')[0] ?? "")?.setFilterValue(selectedFilterValue);
    }

    const [statusFilter, setStatusFilter] = React.useState("");

    const handleChangeStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        table.getColumn("status")?.setFilterValue(selectedStatus);
    };

    const [opened, { open, close }] = useDisclosure(false);


    return (
        <div>
            <Modal opened={opened} onClose={close} centered size="100%" radius={"md"} title={`Tambah ${buttonlabel ?? ""}`}>
                <div className="min-h-[30vh]">
                    {buttonlabel === "Rumah" && <FormCreateHouse close={close} refetchData={refetchData} />}
                    {buttonlabel === "Ajuan Pembayaran" && <FormCreatePaymentRequest close={close} refetchData={refetchData} />}
                    {buttonlabel === "Ajuan Renovasi" && <FormCreateRenovationRequest close={close} refetchData={refetchData} />}
                </div>
            </Modal>
            <div className="flex md:items-center justify-between gap-2 md:gap-5 md:flex-row flex-col-reverse py-4">
                {type === "rumah" && (
                    <div className="flex items-center gap-5 justify-between">
                        <NativeSelect
                            className="md:w-full max-w-sm"
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
                )}
                {type === "ajuan" && (
                    <div className="flex items-center gap-5 justify-between">
                        <NativeSelect
                            className="md:w-full max-w-sm"
                            value={statusFilter}
                            onChange={(event) => handleChangeStatusFilter(event)}
                        >
                            <option value="">Semua</option>
                            <option value="BelumDiajukan">Belum Diajukan</option>
                            <option value="Menunggu">Menunggu</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                        </NativeSelect>
                    </div>
                )}
                {buttonlabel && (
                    <div className="flex items-center justify-end">
                        <MantineButton
                            variant="outline"
                            color="green"
                            onClick={open}
                        >
                            Tambah {buttonlabel}
                        </MantineButton>
                    </div>
                )}
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