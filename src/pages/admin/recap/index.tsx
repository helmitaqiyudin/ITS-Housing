import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function AdminRecap() {
  return (
    <Layout>
      <Seo templateTitle="Rekap" />
      <main className=" min-h-[100vh]">

      </main>
    </Layout>
  );
}

export default withAuth(AdminRecap, "all", 'admin');
