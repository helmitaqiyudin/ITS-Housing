import { Navbar } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function ManageUsers() {
  return (
    <Navbar>
      <Seo templateTitle="Daftar User" />
      <main className=" min-h-screen bg-white">

      </main>
    </Navbar>
  );
}

export default withAuth(ManageUsers, "all", 'admin');
