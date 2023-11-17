import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import { columns } from "~/components/tablecolumns/userrequestcolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";

import PageTitle from "~/components/PageTitle";
import withAuth from "~/components/hoc/withAuth";
import { LoadingOverlay } from "@mantine/core";

const filteroptions = [
  { value: "status", label: "Status" },
];

function UserRequest() {
  const { data: pembayaran, error, isLoading, refetch } = api.ajuan_pembayaran.getAjuanPembayaranbyUserId.useQuery();
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
  // console.log(pembayaran);
  return (
    <Layout>
      <Seo templateTitle="Ajuan Saya" />
      <main className=" min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <PageTitle title="Daftar Ajuan Saya" />
            <div className="w-full">
              <DataTable columns={columns} data={pembayaran} refetchData={refetcher} filteroptions={filteroptions} buttonlabel="Ajuan" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(UserRequest, 'all', 'user');;
