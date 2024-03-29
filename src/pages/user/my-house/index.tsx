import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import moment from "moment";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { Card, Grid, Paper, Skeleton } from '@mantine/core';
import withAuth from "~/components/hoc/withAuth";
import MapComponent from "~/components/Map";

function HouseDetail() {

  const { data: house } = api.house.getHouseByUserId.useQuery();
  // console.log(house);

  if (!house) return (
    <Layout>
      <Seo templateTitle="Rumah Negara" />
      <main className=" min-h-[100vh]">
        <div className="md:container mx-auto my-10">
          <div className="bg-white rounded-md drop-shadow-md p-5">
            <PageTitle title="Rumah Negara Saya" />
            <div className="flex text-center">
              <p className="text-lg font-semibold text-gray-800 p-2">Detail</p>
            </div>
            <Skeleton height={300} className="mb-5" />
          </div>
        </div>
      </main>
    </Layout>
  );

  const blok = house.blok;
  return (
    <Layout>
      <Seo templateTitle="Rumah Negara" />
      <main className=" min-h-[100vh]">
        <div className="md:container mx-auto my-10">
          <div className="bg-white rounded-md drop-shadow-md p-5">
            <PageTitle title="Rumah Negara Saya" />
            {house.boundary && <MapComponent boundary={house.boundary} />}
            <div className="flex text-center">
              <p className="text-lg font-semibold text-gray-800 p-2">Detail</p>
            </div>
            <Paper className="p-5 border-8">
              <Grid gutter="md" grow={false}>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Blok Rumah</dt>
                  <dd className="text-gray-700">{house.blok}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Nama Lengkap</dt>
                  <dd className="text-gray-700">{house.user.name}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Dokumen Kepemilikan</dt>
                  <dd className="text-gray-700">{house.dokumen_kepemilikan}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Luas Tanah</dt>
                  <dd className="text-gray-700">{house.luas_tanah}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Alamat</dt>
                  <dd className="text-gray-700">{house.alamat}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Luas Bangunan</dt>
                  <dd className="text-gray-700">{house.luas_bangunan}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Tanggal SK Rektor</dt>
                  <dd className="text-gray-700">{moment(house.tanggal_sk_rektor).format("DD MMMM YYYY")}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Tarif Sewa</dt>
                  <dd className="text-gray-700">{house.tarif_sewa}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Sumber Dana Pembangunan</dt>
                  <dd className="text-gray-700">{house.sumber_dana_pembangunan}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Golongan</dt>
                  <dd className="text-gray-700">{house.golongan}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">No. SK Penetapan Golongan</dt>
                  <dd className="text-gray-700">{house.sk_golongan}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Nomor Hum</dt>
                  <dd className="text-gray-700">{house.nomor_hum}</dd>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <dt className="font-medium text-gray-900">Kode Hum</dt>
                  <dd className="text-gray-700">{house.kode_hum}</dd>
                </Grid.Col>
              </Grid>
            </Paper>
            <CatatanPenghunian blok={blok} />
          </div>
        </div>
      </main>
    </Layout>
  );
}

type CatatanPenghunianProps = {
  blok: string;
};

function CatatanPenghunian({ blok }: CatatanPenghunianProps) {
  const { data: catatanPenghunian } = api.catatan_penghunian.getCatatanPenghunianByBlok.useQuery({ blok: blok });
  // console.log(catatanPenghunian);

  if (!catatanPenghunian) return (
    <div className="flex text-center flex-wrap mt-5">
      <p className="text-lg font-semibold text-gray-800 p-2">Catatan Penghunian</p>
      <Skeleton height={100} className="mb-5" />
    </div>
  );

  return (
    <>
      <div className="flex text-center flex-wrap mt-5">
        <p className="text-lg font-semibold text-gray-800 p-2">Catatan Penghunian</p>
      </div>
      {catatanPenghunian.map((catatan) => {
        return (
          <div key={catatan.id} className="mb-2">
            <Card withBorder className="p-2">
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-gray-800">{catatan.judul}</p>
                <div className="flex gap-3">
                  <p className="text-sm text-gray-800 self-center">{moment(catatan.created_at).format("DD MMMM YYYY")}</p>
                </div>
              </div>
              <p className="text-gray-800">{catatan.catatan}</p>
            </Card>
          </div>
        )
      })}
      {catatanPenghunian.length === 0 && (
        <div className="flex justify-center p-3">
          <p className="text-lg font-normal text-gray-800">Belum ada catatan penghunian</p>
        </div>
      )}
    </>
  );
}

export default withAuth(HouseDetail, 'all', 'user');
