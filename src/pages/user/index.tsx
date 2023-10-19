import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const UserHome = () => {
  return (
    <Layout>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen bg-white">
        Dashboard User
      </main>
    </Layout>
  );
}

export default withAuth(UserHome, 'all', 'user');