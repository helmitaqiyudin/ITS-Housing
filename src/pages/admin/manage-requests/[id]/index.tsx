import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import { useRouter } from "next/router";
import moment from "moment";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { Badge, Grid, Paper, Button } from '@mantine/core';
import withAuth from "~/components/hoc/withAuth";
import { Skeleton } from "@mantine/core";
import { toast } from "react-toastify";

export enum StatusUpdateAdmin {
    Menunggu = "Menunggu",
    Diterima = "Diterima",
    Ditolak = "Ditolak",
}

function AjuanDetail() {
    const router = useRouter();
    const { id } = router.query;

    const { data: ajuan, refetch } = api.ajuan.getAjuanbyId.useQuery(id! as string);
    const { mutate: updateStatusPembayaran } = api.ajuan.updateStatusAjuanPembayaranAdmin.useMutation();
    const { mutate: updateStatusRenovasi } = api.ajuan.updateStatusAjuanRenovasiAdmin.useMutation();
    // console.log(ajuan);

    if (!ajuan) {
        return (
            <Layout>
                <main className=" min-h-[100vh]">
                    <div className="md:container mx-auto my-10">
                        <div className="bg-white rounded-md drop-shadow-md p-5">
                            <Skeleton
                                height={300}
                            />
                        </div>
                    </div>
                </main>
            </Layout>
        )
    }

    const statusBadge = (status: string) => {
        switch (status) {
            case "Belum Diajukan":
                return <Badge color="gray">Belum Diajukan</Badge>;
            case "Menunggu":
                return <Badge color="yellow">Menunggu</Badge>;
            case "Diterima":
                return <Badge color="green">Diterima</Badge>;
            case "Ditolak":
                return <Badge color="red">Ditolak</Badge>;
            default:
                return <Badge color="gray">Belum Diajukan</Badge>;
        }
    };

    const toRupiah = (angka: number) => {
        let rupiah = "";
        const angkarev = angka.toString().split("").reverse().join("");
        for (let i = 0; i < angkarev.length; i++) {
            if (i % 3 === 0) {
                rupiah += angkarev.substr(i, 3) + ".";
            }
        }
        return (
            "Rp. " +
            rupiah
                .split("", rupiah.length - 1)
                .reverse()
                .join("")
        );
    };


    return (
        <Layout>
            <Seo templateTitle="Detail Ajuan" />
            <main className=" min-h-[100vh]">
                <div className="md:container mx-auto my-10">
                    <div className="bg-white rounded-md drop-shadow-md p-5">
                        <PageTitle title={`Detail Ajuan ${ajuan.type}`} withBackButton />
                        <div className="flex text-center">
                            <p className="text-lg font-semibold text-gray-800 p-2">Detail Ajuan</p>
                        </div>
                        <Paper className="p-5 border-8">
                            <Grid gutter="md" grow={false}>
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Blok Rumah</dt>
                                    <dd className="text-gray-700">{ajuan.house.blok}</dd>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Nama Penghuni</dt>
                                    <dd className="text-gray-700">{ajuan.user.name}</dd>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Alamat</dt>
                                    <dd className="text-gray-700">{ajuan.house.alamat}</dd>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Tanggal Ajuan</dt>
                                    <dd className="text-gray-700">{moment(ajuan.created_at).format("DD MMMM YYYY")}</dd>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Keterangan</dt>
                                    <dd className="text-gray-700">{ajuan.keterangan ?? "-"}</dd>
                                </Grid.Col>

                                {ajuan.type === "Pembayaran" && (
                                    <>
                                        <Grid.Col span={{ xs: 12, md: 3 }}>
                                            <dt className="font-medium text-gray-900">Bulan Bayar</dt>
                                            <dd className="text-gray-700">{ajuan.bulan_bayar}</dd>
                                        </Grid.Col>
                                        <Grid.Col span={{ xs: 12, md: 3 }}>
                                            <dt className="font-medium text-gray-900">Jumlah Bayar</dt>
                                            <dd className="text-gray-700">{toRupiah(ajuan.jumlah_bayar)}</dd>
                                        </Grid.Col>
                                    </>
                                )}
                                <Grid.Col span={{ xs: 12, md: 3 }}>
                                    <dt className="font-medium text-gray-900">Status</dt>
                                    <dd className="text-gray-700">{statusBadge(ajuan.status)}</dd>
                                </Grid.Col>

                            </Grid>
                        </Paper>
                        {ajuan.type === "Pembayaran" && ajuan.status === "Menunggu" && (
                            <div className="flex justify-end mt-5">
                                <Button
                                    variant="filled"
                                    color="green"
                                    onClick={() => {
                                        updateStatusPembayaran(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Diterima },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Terima
                                </Button>
                                <Button
                                    className="ml-3"
                                    variant="filled"
                                    color="red"
                                    onClick={() => {
                                        updateStatusPembayaran(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Ditolak },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Tolak
                                </Button>
                            </div>
                        )}
                        {ajuan.type === "Renovasi" && ajuan.status === "Menunggu" && (
                            <div className="flex justify-end mt-5">
                                <Button
                                    variant="filled"
                                    color="green"
                                    onClick={() => {
                                        updateStatusRenovasi(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Diterima },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Terima
                                </Button>
                                <Button
                                    variant="filled"
                                    color="red"
                                    className="ml-3"
                                    onClick={() => {
                                        updateStatusRenovasi(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Ditolak },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Tolak
                                </Button>
                            </div>
                        )}
                        {ajuan.type === "Pembayaran" && (ajuan.status === "Diterima" || ajuan.status === "Ditolak") ? (
                            <div className="flex justify-end mt-5">
                                <Button
                                    variant="filled"
                                    color="red"
                                    onClick={() => {
                                        updateStatusPembayaran(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Menunggu },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Batalkan
                                </Button>
                            </div>
                        ) : null}
                        {ajuan.type === "Renovasi" && (ajuan.status === "Diterima" || ajuan.status === "Ditolak") ? (
                            <div className="flex justify-end mt-5">
                                <Button
                                    variant="filled"
                                    color="red"
                                    onClick={() => {
                                        updateStatusRenovasi(
                                            { id: ajuan.id, status: StatusUpdateAdmin.Menunggu },
                                            {
                                                onSuccess: () => {
                                                    void refetch();
                                                    toast.success("Status Ajuan berhasil diubah");
                                                    void refetch();
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Batalkan
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default withAuth(AjuanDetail, 'all', 'admin');;
