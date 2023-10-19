import { useRouter } from "next/router";
import { Layout } from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import Seo from "~/components/Seo";
import { Paper, Grid, TextInput, Button, LoadingOverlay, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";


import { api } from "~/utils/api";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import withAuth from "~/components/hoc/withAuth";

function EditHouse() {
  const router = useRouter();
  const { id } = router.query;

  const { data: house, refetch } = api.house.getHouseById.useQuery({ id: id! as string });
  const { data: user } = api.user.getAllUsers.useQuery();
  const mutation = api.house.updateHouse.useMutation();

  const userObject = user?.find((user) => user.id === house?.id_tenaga);

  const form = useForm({
    initialValues: {
      blok: house?.blok,
      id_tenaga: userObject?.id ?? "",
      dokumen_kepemilikan: house?.dokumen_kepemilikan,
      luas_tanah: house?.luas_tanah,
      alamat: house?.alamat,
      luas_bangunan: house?.luas_bangunan,
      tanggal_sk_rektor: house?.tanggal_sk_rektor,
      tarif_sewa: house?.tarif_sewa,
      sumber_dana_pembangunan: house?.sumber_dana_pembangunan,
      golongan: house?.golongan,
      sk_golongan: house?.sk_golongan,
      nomor_hum: house?.nomor_hum,
      kode_hum: house?.kode_hum,
    },
  });

  if (!house || !user) {
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
        id: house.id,
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
          toast.success("Data rumah berhasil diubah");
          void refetch();
          void router.push(`/admin/manage-houses/${id?.toString() ?? ""}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Data rumah gagal diubah");
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
      <Seo templateTitle="Edit Rumah Negara" />
      <main className=" min-h-screen">
        <PageTitle title="Edit Rumah Negara" />
        <div className="container mx-auto">
          <div className="flex text-center">
            <p className="text-lg font-semibold text-gray-800 p-2">Detail</p>
          </div>
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
      </main>
    </Layout>
  );
}

export default withAuth(EditHouse, 'all', 'admin');
