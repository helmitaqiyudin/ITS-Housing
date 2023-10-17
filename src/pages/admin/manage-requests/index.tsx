import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function ManageRequests() {
  return (
    <Navbar>
      <Seo templateTitle="Daftar Ajuan" />
      <main className=" min-h-screen bg-white">

      </main>
    </Navbar>
  );
}

export default withAuth(ManageRequests, "all", 'admin');
