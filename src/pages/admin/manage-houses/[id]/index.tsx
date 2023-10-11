import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import Router from "next/router";

function HouseDetail() {
  // const { id } = Router.query;
  // console.log(id);

  return (
    <Navbar>
      <Seo templateTitle="Detail Rumah Negara" />
      <main className=" min-h-screen bg-gradient-to-b from-white to-gray-300">

      </main>
    </Navbar>
  );
}

export default HouseDetail
