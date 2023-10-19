import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function AdminRecap() {
  return (
    <Layout>
      <Seo templateTitle="Rekap" />
      <main className=" min-h-screen bg-white">

      </main>
    </Layout>
  );
}

export default withAuth(AdminRecap, "all", 'admin');
