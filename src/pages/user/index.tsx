import { Navbar } from "~/components/Navbar";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const UserHome = () => {
  return (
    <Navbar>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen bg-gradient-to-b from-white to-gray-300">
        Dashboard User
      </main>
    </Navbar>
  );
}

export default withAuth(UserHome, 'all', 'user');