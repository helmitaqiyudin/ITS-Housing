import { api } from "~/utils/api";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { LoadingOverlay, Paper, Grid, Select, TextInput, NumberInput } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";

export default function FormCreatePaymentRequest({ close, refetchData }: { close: () => void, refetchData: () => void }) {
    const mutation = api.ajuan_pembayaran.createAjuanPembayaran.useMutation();

    const form = useForm({
        initialValues: {
            blok: "",
            id_tenaga: "",
            bulan_bayar: "",
            jumlah_bayar: 0,
            keterangan: "",
        },
    });

    const submitForm = () => {
        const formData = {
            ...form.values,
        };

        mutation.mutate(formData, {
            onSuccess: () => {
                toast.success("Permintaan pembayaran berhasil dibuat");
                form.reset();
                close();
                refetchData();
            },
            onError: (error) => {
                console.error(error);
                toast.error("Gagal membuat permintaan pembayaran");
            },
        });
    };

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
                }}>
                    <Grid gutter="md" grow={false}>
                        <Grid.Col span={{ xs: 12, md: 6 }}>
                            <TextInput
                                label="Blok"
                                placeholder="Blok"
                                {...form.getInputProps('blok')}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 6 }}>
                            <TextInput
                                label="ID Tenaga"
                                placeholder="ID Tenaga"
                                {...form.getInputProps('id_tenaga')}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 6 }}>
                            <TextInput
                                label="Bulan Bayar"
                                placeholder="Bulan Bayar"
                                {...form.getInputProps('bulan_bayar')}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 6 }}>
                            <NumberInput
                                label="Jumlah Bayar"
                                placeholder="Jumlah Bayar"
                                value={form.values.jumlah_bayar}
                                onChange={(value) => form.setFieldValue('jumlah_bayar', value ? parseInt(value, 10) : 0)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, md: 6 }}>
                            <TextInput
                                label="Keterangan"
                                placeholder="Keterangan"
                                {...form.getInputProps('keterangan')}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className="flex justify-center gap-5 w-full mt-5">
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
    );
}