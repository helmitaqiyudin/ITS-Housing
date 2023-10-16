import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const AdminHome = () => {
  return (
    <Navbar>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen bg-white">
        Dashboard Admin
      </main>
    </Navbar>
  );
}

export default withAuth(AdminHome, 'all', 'admin');