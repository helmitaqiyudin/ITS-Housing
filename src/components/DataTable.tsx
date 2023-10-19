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
import { NativeSelect, TextInput, Modal, LoadingOverlay, Paper, Grid, Select } from "@mantine/core";
import { Button } from "~/components/ui/button"
import { Button as MantineButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { DateInput } from "@mantine/dates";

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

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        setFilterValue("");
        table.getColumn(selectedFilter?.split('.')[0] ?? "")?.setFilterValue("");

        table.getColumn("blok")?.setFilterValue("");
        table.getColumn("user")?.setFilterValue("");
        table.getColumn("alamat")?.setFilterValue("");

    }

    const handleChangeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFilterValue = event.target.value;
        setFilterValue(selectedFilterValue);
        table.getColumn(filter?.split('.')[0] ?? "")?.setFilterValue(selectedFilterValue);
    }

    const [opened, { open, close }] = useDisclosure(false);


    return (
        <div>
            <Modal opened={opened} onClose={close} title="Tambah Rumah" centered size="100%">
                <FormCreateHouse close={close} />
            </Modal>
            <div className="flex items-center justify-between gap-5">
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
                <div className="flex items-center justify-end py-4">
                    <MantineButton size="sm" color="green" onClick={open}>
                        Tambah Rumah
                    </MantineButton>
                </div>
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

function FormCreateHouse({ close }: { close: () => void }) {
    const { data: user } = api.user.getAllUsers.useQuery();
    const mutation = api.house.createHouse.useMutation();

    const form = useForm({
        initialValues: {
            blok: "",
            id_tenaga: "",
            dokumen_kepemilikan: "",
            luas_tanah: 0,
            alamat: "",
            luas_bangunan: 0,
            tanggal_sk_rektor: new Date(),
            tarif_sewa: 0,
            sumber_dana_pembangunan: "",
            golongan: "",
            sk_golongan: "",
            nomor_hum: "",
            kode_hum: ""
        },
    });

    if (!user) {
        return (
            <LoadingOverlay
                visible={true}
                zIndex={9999}
                loaderProps={{ color: 'blue', type: 'bars' }}
            />
        )
    }


    const submitForm = () => {
        mutation.mutate(
            {
                blok: form.values.blok ?? "",
                id_tenaga: form.values.id_tenaga ?? "",
                dokumen_kepemilikan: form.values.dokumen_kepemilikan ?? "",
                luas_tanah: form.values.luas_tanah ?? 0,
                alamat: form.values.alamat ?? "",
                luas_bangunan: form.values.luas_bangunan ?? 0,
                tanggal_sk_rektor: form.values.tanggal_sk_rektor ?? new Date(),
                tarif_sewa: form.values.tarif_sewa ?? 0,
                sumber_dana_pembangunan: form.values.sumber_dana_pembangunan ?? "",
                golongan: form.values.golongan ?? "",
                sk_golongan: form.values.sk_golongan ?? "",
                nomor_hum: form.values.nomor_hum ?? "",
                kode_hum: form.values.kode_hum ?? ""
            },
            {
                onSuccess: () => {
                    console.log('Success response:', Response);
                    toast.success("Rumah berhasil ditambahkan");
                    form.reset();
                    close();
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("Rumah gagal ditambahkan");
                },
            }
        );
    }

    const handleSubmit = () => {
        form.validate();
        if (!form.isValid()) {
            return;
        }
        submitForm();
    };

    return (
        <>
            <Paper className="p-5 border-8" shadow="sm" style={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <form className="mb-5 flex flex-col" onSubmit={(e) => {
                    handleSubmit();
                    e.preventDefault();
                }}
                >
                    <Grid gutter="md" grow={false}>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Blok Rumah</label>
                            <TextInput
                                placeholder="Blok Rumah"
                                value={form.values.blok}
                                onChange={(event) => form.setFieldValue("blok", event.currentTarget.value)}
                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Nama Lengkap</label>
                            <Select
                                placeholder="Nama Lengkap"
                                value={form.values.id_tenaga}
                                onChange={(value) => form.setFieldValue("id_tenaga", value ?? "")}
                                data={user.map(({ id, name }) => ({ value: id, label: name ?? "" }))}
                                required
                                searchable
                                nothingFoundMessage="Nothing found"
                                withCheckIcon={false}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Dokumen Kepemilikan</label>
                            <TextInput
                                placeholder="Dokumen Kepemilikan"
                                value={form.values.dokumen_kepemilikan ?? ""}
                                onChange={(event) => form.setFieldValue("dokumen_kepemilikan", event.currentTarget.value)}
                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Luas Tanah</label>
                            <TextInput
                                placeholder="Luas Tanah"
                                value={form.values.luas_tanah ?? ""}
                                onChange={(event) => {
                                    const value = event.currentTarget.value;
                                    form.setFieldValue("luas_tanah", value ? parseInt(value) : 0);
                                }}
                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Alamat</label>
                            <TextInput
                                placeholder="Alamat"
                                value={form.values.alamat ?? ""}
                                onChange={(event) => form.setFieldValue("alamat", event.currentTarget.value)}
                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Luas Bangunan</label>
                            <TextInput
                                placeholder="Luas Bangunan"
                                value={form.values.luas_bangunan ?? ""}
                                onChange={(event) => {
                                    const value = event.currentTarget.value;
                                    form.setFieldValue("luas_bangunan", value ? parseInt(value) : 0);
                                }}
                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Tanggal SK Rektor</label>
                            <DateInput
                                placeholder="Tanggal SK Rektor"
                                value={form.values.tanggal_sk_rektor ? new Date(form.values.tanggal_sk_rektor) : undefined}
                                onChange={(date) => form.setFieldValue("tanggal_sk_rektor", date ? new Date(date) : new Date())}

                                required />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Tarif Sewa</label>
                            <TextInput
                                placeholder="Tarif Sewa"
                                value={form.values.tarif_sewa ?? ""}
                                onChange={(event) => {
                                    const value = event.currentTarget.value;
                                    form.setFieldValue("tarif_sewa", value ? parseInt(value) : 0);
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Sumber Dana Pembangunan</label>
                            <TextInput
                                placeholder="Sumber Dana Pembangunan"
                                value={form.values.sumber_dana_pembangunan ?? ""}
                                onChange={(event) => form.setFieldValue("sumber_dana_pembangunan", event.currentTarget.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Golongan</label>
                            <TextInput
                                placeholder="Golongan"
                                value={form.values.golongan ?? ""}
                                onChange={(event) => form.setFieldValue("golongan", event.currentTarget.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">No. SK Penetapan Golongan</label>
                            <TextInput
                                placeholder="No. SK Penetapan Golongan"
                                value={form.values.sk_golongan ?? ""}
                                onChange={(event) => form.setFieldValue("sk_golongan", event.currentTarget.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Nomor Hum</label>
                            <TextInput
                                placeholder="Nomor Hum"
                                value={form.values.nomor_hum ?? ""}
                                onChange={(event) => form.setFieldValue("nomor_hum", event.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 3 }}>
                            <label className="font-medium text-gray-900">Kode Hum</label>
                            <TextInput
                                placeholder="Kode Hum"
                                value={form.values.kode_hum ?? ""}
                                onChange={(event) => form.setFieldValue("kode_hum", event.currentTarget.value)}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className="flex justify-center gap-5 w-full mt-5 ">
                        <MantineButton
                            type="button"
                            variant="outline"
                            color="red"
                            fullWidth
                            radius={"md"}
                            onClick={() => {
                                close();
                                form.reset();
                            }}
                        >
                            Batal
                        </MantineButton>
                        <MantineButton
                            type="submit"
                            variant="filled"
                            color="green"
                            fullWidth
                            radius={"md"}
                            loading={mutation.isLoading}
                        >
                            Simpan
                        </MantineButton>
                    </div>
                </form>
            </Paper>
        </>
    )
}

