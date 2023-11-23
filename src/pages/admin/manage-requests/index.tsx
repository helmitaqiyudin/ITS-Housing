import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import { columns } from "~/components/tablecolumns/adminrequestcolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";

import PageTitle from "~/components/PageTitle";
import withAuth from "~/components/hoc/withAuth";
import { Skeleton, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const filteroptions = [
  { value: "status", label: "Status" },
  { value: "user", label: "Nama Penghuni" },
  { value: "blok", label: "Blok" },
];


function ManageRequests() {
  const router = useRouter();

  const defaultQuery = "pembayaran";
  const [query, setQuery] = useState(defaultQuery);

  const { data: pembayaran, error, isLoading, refetch } = api.ajuan.getAllAjuan.useQuery(query);

  useEffect(() => {
    const hashValue = window.location.hash.slice(1);
    if (hashValue) {
      setQuery(hashValue);
    }
  }, [router.asPath]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    void router.push(`/admin/manage-requests#${value}`, undefined, { shallow: true });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const refetcher = () => {
    void refetch();
  }
  return (
    <Layout>
      <Seo templateTitle="Daftar Ajuan" />
      <main className=" min-h-[100vh]">
        <div className="md:container mx-auto my-10">
          <div className="bg-white p-5 rounded-md drop-shadow-md">
            <PageTitle title="Daftar Ajuan" />
            <div className="flex flex-col items-center justify-center w-full">
              <SegmentedControl
                w={{ xs: "10%", md: "30%" }}
                radius="md"
                data={[
                  { value: "pembayaran", label: "Pembayaran" },
                  { value: "renovasi", label: "Renovasi" },
                ]}
                value={query}
                onChange={handleQueryChange} />
              {isLoading ? <Skeleton height={300} className="mt-5" /> :
                <div className="w-full">
                  {query === "pembayaran" && <DataTable columns={columns} data={pembayaran} refetchData={refetcher} filteroptions={filteroptions} />}
                  {query === "renovasi" && <DataTable columns={columns} data={pembayaran} refetchData={refetcher} filteroptions={filteroptions} />}
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(ManageRequests, "all", 'admin');
