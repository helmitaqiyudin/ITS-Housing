import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const AdminHome = () => {
  return (
    <Layout>
      <Seo templateTitle="Dashboard" />
      <main className=" min-h-screen">
        Dashboard Admin
      </main>
    </Layout>
  );
}

export default withAuth(AdminHome, 'all', 'admin');