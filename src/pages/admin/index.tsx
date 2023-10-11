import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";

function AdminHome() {
  return (
    <Navbar>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen bg-gradient-to-b from-white to-gray-300">

      </main>
    </Navbar>
  );
}

export default AdminHome
