import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import { useRouter } from "next/router";
import moment from "moment";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { Card, Grid, Paper } from '@mantine/core';

function HouseDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: house } = api.house.getHouseById.useQuery({ id: id! as string });
  console.log(house);
  const blok = house?.blok;

  return (
    <Navbar>
      <Seo templateTitle="Detail Rumah Negara" />
      <main className=" min-h-screen">
        <PageTitle title="Detail Rumah Negara" />
        <div className="container mx-auto">
          <p className="text-lg font-semibold text-gray-800 p-3">Detail</p>
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
          <p className="text-lg font-semibold text-gray-800 p-3">Catatan Penghunian</p>
          {blok && <CatatanPenghunian blok={blok} />}
        </div>
      </main>
    </Navbar>
  );
}

function CatatanPenghunian({ blok }: { blok?: string }) {
  const { data: catatanPenghunian } = api.catatan_penghunian.getCatatanPenghunianByBlok.useQuery({ blok: blok! });
  console.log(catatanPenghunian);
  return (
  //   [
  //     {
  //         "id": "562c1207-d724-4df2-8158-5b85e689dae4",
  //         "blok": "A-004",
  //         "judul": "Sampah",
  //         "catatan": "Tolong sampahnya dibuang",
  //         "created_at": "2023-10-13T05:54:25.104Z",
  //         "updated_at": "2023-10-13T05:52:44.206Z"
  //     },
  //     {
  //         "id": "da65403a-9b16-4031-a384-89089b8bf9da",
  //         "blok": "A-004",
  //         "judul": "AC",
  //         "catatan": "Tolong acnya kalo kamarnya ditinggal harap dimatikan",
  //         "created_at": "2023-10-14T16:49:42.036Z",
  //         "updated_at": "2023-10-14T16:48:34.181Z"
  //     }
  // ]
    <>
      {/* display judul, catatan, and created_at, make a card for each catatan, also add numbering */}
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
    </>
  );
}

export default HouseDetail;
