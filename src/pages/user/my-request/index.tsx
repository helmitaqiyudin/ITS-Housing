import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import { columns } from "~/components/tablecolumns/userrequestcolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";

import PageTitle from "~/components/PageTitle";
import withAuth from "~/components/hoc/withAuth";
import { Skeleton, SegmentedControl } from "@mantine/core";
import { useState } from "react";

const filteroptions = [
  { value: "status", label: "Status" },
];

function UserRequest() {
  const [query, setQuery] = useState("pembayaran");
  const { data: pembayaran, error, isLoading, refetch } = api.ajuan.getAjuanPembayaranbyUserId.useQuery(query);

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
            <SegmentedControl
              w={{ xs: "10%", md: "30%" }}
              radius="md"
              data={[
                { value: "pembayaran", label: "Pembayaran" },
                { value: "renovasi", label: "Renovasi" },
              ]}
              value={query}
              onChange={(value) => {
                setQuery(value);
              }} />
            {isLoading ? <Skeleton height={300} className="mt-5" /> :
              <div className="w-full">
                {query === "pembayaran" && <DataTable columns={columns} data={pembayaran} refetchData={refetcher} filteroptions={filteroptions} buttonlabel="Ajuan Pembayaran" />}
                {query === "renovasi" && <DataTable columns={columns} data={pembayaran} refetchData={refetcher} filteroptions={filteroptions} buttonlabel="Ajuan Renovasi" />}
              </div>
            }
          </div>
        </div>
      </main>
    </Layout >
  );
}

export default withAuth(UserRequest, 'all', 'user');;
