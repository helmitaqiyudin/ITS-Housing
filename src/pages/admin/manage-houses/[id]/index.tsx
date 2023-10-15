import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { Card, Grid, Modal, Paper } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {toast} from "react-toastify"

function HouseDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: house } = api.house.getHouseById.useQuery({ id: id! as string });
  // console.log(house);
  const blok = house?.blok;

  return (
    <Navbar>
      <Seo templateTitle="Detail Rumah Negara" />
      <main className=" min-h-screen">
        <PageTitle title="Detail Rumah Negara" />
        <div className="container mx-auto">
          <div className="flex text-center">
            <p className="text-lg font-semibold text-gray-800 p-2">Detail •</p><Link href={`/admin/manage-houses/${id! as string}/edit#house`} className="self-center text-blue-500 font-medium"><span>Edit</span> </Link>
          </div>
          <Paper className="p-5 border-8" shadow="sm" style={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <Grid gutter="md" grow={false}>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Blok Rumah</dt>
                <dd className="text-gray-700">{house?.blok}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Nama Lengkap</dt>
                <dd className="text-gray-700">{house?.user.name}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Dokumen Kepemilikan</dt>
                <dd className="text-gray-700">{house?.dokumen_kepemilikan}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Luas Tanah</dt>
                <dd className="text-gray-700">{house?.luas_tanah}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Alamat</dt>
                <dd className="text-gray-700">{house?.alamat}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Luas Bangunan</dt>
                <dd className="text-gray-700">{house?.luas_bangunan}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Tanggal SK Rektor</dt>
                <dd className="text-gray-700">{moment(house?.tanggal_sk_rektor).format("DD MMMM YYYY")}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Tarif Sewa</dt>
                <dd className="text-gray-700">{house?.tarif_sewa}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Sumber Dana Pembangunan</dt>
                <dd className="text-gray-700">{house?.sumber_dana_pembangunan}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Golongan</dt>
                <dd className="text-gray-700">{house?.golongan}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">No. SK Penetapan Golongan</dt>
                <dd className="text-gray-700">{house?.sk_golongan}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Nomor Hum</dt>
                <dd className="text-gray-700">{house?.nomor_hum}</dd>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, md: 3 }}>
                <dt className="font-medium text-gray-900">Kode Hum</dt>
                <dd className="text-gray-700">{house?.kode_hum}</dd>
              </Grid.Col>
            </Grid>
          </Paper>
          {blok && <CatatanPenghunian blok={blok} />}
        </div>
      </main>
    </Navbar>
  );
}

type CatatanPenghunianProps = {
  blok: string;
};

function CatatanPenghunian({ blok }: CatatanPenghunianProps) {
  const { data: catatanPenghunian } = api.catatan_penghunian.getCatatanPenghunianByBlok.useQuery({ blok: blok });
  // console.log(catatanPenghunian);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Catatan Penghunian" centered>
        <Form blok={blok} close={close} />
      </Modal>
      <div className="flex text-center mt-5">
        <p className="text-lg font-semibold text-gray-800 p-2">Catatan Penghunian •</p><a onClick={open} className="self-center text-blue-500 font-medium cursor-pointer"><span>Tambah</span> </a>
      </div>
      {catatanPenghunian?.map((catatan) => {
        return (
          <div key={catatan.id} className="mb-2">
            <Card shadow="sm" className="p-2">
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-gray-800">{catatan.judul}</p>
                <p className="text-sm text-gray-800">{moment(catatan.created_at).format("DD MMMM YYYY")}</p>
              </div>
              <p className="text-gray-800">{catatan.catatan}</p>
            </Card>
          </div>
        )
      })}
      {catatanPenghunian?.length === 0 && (
        <div className="flex justify-center p-2">
          <p className="text-lg font-semibold text-gray-800">Belum ada catatan penghunian</p>
        </div>
      )}
    </>
  );
}

function Form ({blok, close}: {blok: string, close: () => void}) {
  const form = useForm({
    initialValues: {
      judul: "",
      catatan: "",
      blok: blok,
    },
    validate: {
      judul: (value) => value.trim().length < 3 && "Judul harus lebih dari 3 karakter",
      catatan: (value) => value.trim().length < 3 && "Catatan harus lebih dari 3 karakter",
    },
  });

  const { mutate } = api.catatan_penghunian.createCatatanPenghunian.useMutation();

  const submitForm = () => {
    mutate(
      { ...form.values, blok: blok },
      {
        onSuccess: () => {
          toast.success("Catatan berhasil ditambahkan");
          form.reset();
          close();
        },
        onError: (error) => {
          console.error(error);
          toast.error("Catatan gagal ditambahkan");
        },
      }
      );
    // console.log(form.values);
    // form.reset();
    // close();
  }
  
  const handleSubmit = () => {;
    form.validate();
      if (!form.isValid()){
        return;
      }
      submitForm();
    };

  return (
    <form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <div className="flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judul">
                Judul
              </label>
              <input
                {...form.getInputProps("judul")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="judul"
                placeholder="Judul"
              />
              {form.errors.judul && (
                <div className="text-red-500 text-sm mt-1">{form.errors.judul}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catatan">
                Catatan
              </label>
              <textarea
                {...form.getInputProps("catatan")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Catatan"
              />
              {form.errors.catatan && (
                <div className="text-red-500 text-sm mt-1">{form.errors.catatan}</div>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Tambah Catatan
              </button>
            </div>
          </div>
        </form>
  )
}

export default HouseDetail;
