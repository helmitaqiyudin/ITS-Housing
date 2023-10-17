import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";
import { columns } from "./columns";
import { DataTable } from "~/components/DataTable";

import { api } from "~/utils/api";
import PageTitle from "~/components/PageTitle";
import { LoadingOverlay } from "@mantine/core";

function ManageHouse() {
  const { data: houses, error, isLoading } = api.house.getAllHouses.useQuery();

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

  return (
    <Navbar>
      <Seo templateTitle="Rumah Negara" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <PageTitle title="Rumah Negara" />
            <div className="w-full">
              <DataTable columns={columns} data={houses} />
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  );
}

export default withAuth(ManageHouse, "all", 'admin');
