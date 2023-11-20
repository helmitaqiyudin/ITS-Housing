import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";
import { columns } from "../../../components/tablecolumns/housecolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { Skeleton } from "@mantine/core";

const filteroptions = [
  { value: "blok", label: "Blok" },
  { value: "user", label: "Nama Penghuni" },
  { value: "alamat", label: "Alamat" },
]

function ManageHouse() {
  const { data: houses, error, isLoading, refetch } = api.house.getAllHouses.useQuery();

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
            {isLoading ? <Skeleton height={300} className="mt-5" /> :
              <div className="w-full">
                <DataTable columns={columns} data={houses} refetchData={refetcher} filteroptions={filteroptions} buttonlabel="Rumah" />
              </div>
            }
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(ManageHouse, "all", 'admin');
