import { Navbar } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";
import { columns } from "../../../components/tablecolumns/housecolumns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { LoadingOverlay } from "@mantine/core";

function ManageHouse() {
  const { data: houses, error, isLoading, refetch } = api.house.getAllHouses.useQuery();

  if (isLoading) {
    return(
      <LoadingOverlay 
      visible={true}
      zIndex={9999}
      loaderProps={{color: 'blue', type: 'bars'}}
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
    <Navbar>
      <Seo templateTitle="Rumah Negara" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <PageTitle title="Rumah Negara" />
            <div className="w-full">
              <DataTable columns={columns} data={houses} refetchData={refetcher} />
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  );
}

export default withAuth(ManageHouse, "all", 'admin');
