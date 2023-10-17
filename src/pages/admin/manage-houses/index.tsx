import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import withAuth from "~/components/hoc/withAuth";

import { api } from "~/utils/api";
import { IoMdOpen } from 'react-icons/io'
import PageTitle from "~/components/PageTitle";

function ManageHouse() {
  const router = useRouter();

  const { data: houses } = api.house.getAllHouses.useQuery();
  console.log(houses);

  const handleClick = (id: string) => {
    void router.push(`/admin/manage-houses/${id}`);
  };

  const elements = houses?.map((house) => {
    return (
      <Table.Tr key={house.id}>
        <Table.Td>{house.blok}</Table.Td>
        <Table.Td>{house.user?.name}</Table.Td>
        <Table.Td>{house.alamat}</Table.Td>
        <Table.Td ><IoMdOpen onClick={() => handleClick(house.id)} className="cursor-pointer hover:bg-white" /></Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Navbar>
      <Seo templateTitle="Rumah Negara" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <PageTitle title="Rumah Negara" />
            <Table className="w-full" withTableBorder w={"90%"} withColumnBorders highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Blok</Table.Th>
                  <Table.Th>Penghuni</Table.Th>
                  <Table.Th>Alamat</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {elements}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </main>
    </Navbar>
  );
}

export default withAuth(ManageHouse, "all", 'admin');
