import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import { Table } from "@mantine/core";
import Router from "next/router";
import withAuth from "~/components/hoc/withAuth";

import { api } from "~/utils/api";
import { IoMdOpen } from 'react-icons/io'

function ManageHouse() {
  const { data: houses } = api.house.getAllHouses.useQuery();
  console.log(houses);

  const handleClick = (id : string) => {
    void Router.push(`/admin/manage-houses/${id}`);
  };

  const elements = houses?.map((house) => {
    return (
      <Table.Tr key={house.id}>
          <Table.Td>{house.blok}</Table.Td>
          <Table.Td>{house.user.name}</Table.Td>
          <Table.Td>{house.alamat}</Table.Td>
          <Table.Td ><IoMdOpen  onClick={() => handleClick(house.id)} className="cursor-pointer hover:bg-white" /></Table.Td>
        </Table.Tr>
    )
  })

  return (
    <Navbar>
      <Seo templateTitle="Rumah Negara" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 my-5">Rumah Negara</h1>
            <Table className="w-full" withTableBorder w={"70%"}>
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

export default withAuth(ManageHouse, "auth", 'admin');
