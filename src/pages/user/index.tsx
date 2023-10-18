import { Navbar } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const UserHome = () => {
  return (
    <Navbar>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen bg-white">
        Dashboard User
      </main>
    </Navbar>
  );
}

export default withAuth(UserHome, 'all', 'user');