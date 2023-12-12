import { useRouter } from "next/router";
import { Layout } from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import Seo from "~/components/Seo";
import { Paper, Grid, TextInput, Button, Skeleton, InputLabel } from "@mantine/core";
import { DateInput } from "@mantine/dates";


import { api } from "~/utils/api";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import withAuth from "~/components/hoc/withAuth";
import { useState } from "react";

const formatRupiah = (value: number) => {
    const stringValue = value.toString();
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

function EditAjuan() {
    const router = useRouter();
    const { id } = router.query;

    const { data: ajuan, refetch } = api.ajuan.getAjuanbyId.useQuery(id as string);
    const mutation = api.ajuan.updateAjuan.useMutation();

    const type = ajuan?.type;
    const [jumlahBayarRaw, setJumlahBayarRaw] = useState(ajuan?.type === "Pembayaran" ? ajuan.jumlah_bayar : 0);

    const form = useForm({
        initialValues: {
            type: ajuan?.type,
            blok: ajuan?.house.blok,
            id_tenaga: ajuan?.user.id,
            keterangan: ajuan?.keterangan,
            ...(ajuan?.type === "Pembayaran" && {
                bulan_bayar: ajuan?.bulan_bayar,
                jumlah_bayar: ajuan?.jumlah_bayar,
            }),
        },
    });

    if (!ajuan) {
        return (
            <Layout>
                <Seo templateTitle="Edit Ajuan" />
                <main className=" min-h-[100vh]">
                    <div className="md:container mx-auto my-10">
                        <div className="bg-white rounded-md drop-shadow-md p-5">
                            <PageTitle title="Edit Ajuan" />
                            <Skeleton height={400} className="mt-5" />
                        </div>
                    </div>
                </main>
            </Layout>
        )
    }

    const submitForm = () => {
        mutation.mutate(
            {
                id: ajuan.id,
                type: type as "Pembayaran" | "Pengajuan",
                blok: ajuan.house.blok,
                id_tenaga: ajuan.user.id,
                keterangan: form.values.keterangan,
                ...(ajuan?.type === "Pembayaran" && {
                    bulan_bayar: form.values.bulan_bayar,
                    jumlah_bayar: jumlahBayarRaw,
                }),
            },
            {
                onSuccess: () => {
                    toast.success("Data ajuan berhasil diubah");
                    void refetch();
                    void router.push(`/user/my-requests/${id?.toString()}`);
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("Data ajuan gagal diubah");
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
        <Layout>
            <Seo templateTitle="Edit Ajuan" />
            <main className=" min-h-[100vh]">
                <div className="md:container mx-auto my-10">
                    <div className="bg-white rounded-md drop-shadow-md p-5">
                        <PageTitle title="Edit Ajuan" />
                        <Paper className="p-5 border-8">
                            <form className="mb-5 flex flex-col" onSubmit={(e) => {
                                handleSubmit();
                                e.preventDefault();
                            }}
                            >
                                {/* only changeable is keterangan, bulan bayar, jumlah bayar */}
                                <Grid gutter="md" grow={false}>
                                    <Grid.Col span={{ xs: 12, md: 3 }}>
                                        <InputLabel required className="font-medium text-gray-900">Blok Rumah</InputLabel>
                                        <TextInput
                                            placeholder="Blok Rumah"
                                            value={ajuan.house.blok}
                                            disabled
                                            required />
                                    </Grid.Col>
                                    <Grid.Col span={{ xs: 12, md: 3 }}>
                                        <InputLabel required className="font-medium text-gray-900">Nama Penghuni</InputLabel>
                                        <TextInput
                                            placeholder="Nama Penghuni"
                                            value={ajuan.user.name}
                                            disabled
                                            required />
                                    </Grid.Col>
                                    <Grid.Col span={{ xs: 12, md: 3 }}>
                                        <InputLabel required className="font-medium text-gray-900">Alamat</InputLabel>
                                        <TextInput
                                            placeholder="Alamat"
                                            value={ajuan.house.alamat}
                                            disabled
                                            required />
                                    </Grid.Col>
                                    <Grid.Col span={{ xs: 12, md: 3 }}>
                                        <InputLabel required className="font-medium text-gray-900">Tanggal Ajuan</InputLabel>
                                        <DateInput
                                            placeholder="Tanggal Ajuan"
                                            value={ajuan.created_at}
                                            disabled
                                            required />
                                    </Grid.Col>
                                    <Grid.Col span={{ xs: 12, md: 3 }}>
                                        <InputLabel required className="font-medium text-gray-900">Keterangan</InputLabel>
                                        <TextInput
                                            placeholder="Keterangan"
                                            defaultValue={ajuan.keterangan}
                                            required
                                            onChange={(event) => form.setFieldValue("keterangan", event.currentTarget.value)} />
                                    </Grid.Col>
                                    {ajuan.type === "Pembayaran" && (
                                        <>
                                            <Grid.Col span={{ xs: 12, md: 3 }}>
                                                <InputLabel required className="font-medium text-gray-900">Bulan Bayar</InputLabel>
                                                <TextInput
                                                    placeholder="Bulan Bayar"
                                                    defaultValue={ajuan.bulan_bayar}
                                                    required
                                                    onChange={(event) => form.setFieldValue("bulan_bayar", event.currentTarget.value)} />
                                            </Grid.Col>
                                            <Grid.Col span={{ xs: 12, md: 3 }}>
                                                <InputLabel required className="font-medium text-gray-900">Jumlah Bayar</InputLabel>
                                                <TextInput
                                                    placeholder="Jumlah Bayar"
                                                    defaultValue={formatRupiah(ajuan.jumlah_bayar)}
                                                    onChange={(event) => {
                                                        const value = event.currentTarget.value.replace(/\D/g, '');
                                                        setJumlahBayarRaw(value ? parseInt(value, 10) : 0);
                                                        event.currentTarget.value = formatRupiah(value ? parseInt(value, 10) : 0);
                                                    }}
                                                    required
                                                />
                                            </Grid.Col>
                                        </>
                                    )}
                                </Grid>
                                <div className="flex justify-center gap-5 w-full mt-5 ">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        color="red"
                                        fullWidth
                                        radius={"md"}
                                        onClick={() => router.back()}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="filled"
                                        color="green"
                                        fullWidth
                                        radius={"md"}
                                        loading={mutation.isLoading}
                                    >
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default withAuth(EditAjuan, 'all', 'user');
