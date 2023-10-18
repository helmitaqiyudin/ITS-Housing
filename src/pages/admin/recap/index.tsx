import { Navbar } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function AdminRecap() {
  return (
    <Navbar>
      <Seo templateTitle="Rekap" />
      <main className=" min-h-screen bg-white">

      </main>
    </Navbar>
  );
}

export default withAuth(AdminRecap, "all", 'admin');
