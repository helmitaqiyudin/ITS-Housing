import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";
import { columns } from "../../../components/tablecolumns/housecolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { LoadingOverlay } from "@mantine/core";

const filteroptions = [
  { value: "blok", label: "Blok" },
  { value: "user", label: "Nama Penghuni" },
  { value: "alamat", label: "Alamat" },
]

function ManageHouse() {
  const { data: houses, error, isLoading, refetch } = api.house.getAllHouses.useQuery();

  if (isLoading) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={9999}
        loaderProps={{ color: 'blue', type: 'bars' }}
      />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const refetcher = () => {
    void refetch();
  }

  return (
    <Layout>
      <Seo templateTitle="Rumah Negara" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <PageTitle title="Rumah Negara" />
            <div className="w-full">
              <DataTable columns={columns} data={houses} refetchData={refetcher} filteroptions={filteroptions} buttonlabel="Rumah" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(ManageHouse, "all", 'admin');
