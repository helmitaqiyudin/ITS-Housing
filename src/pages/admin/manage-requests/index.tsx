import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function ManageRequests() {
  return (
    <Layout>
      <Seo templateTitle="Daftar Ajuan" />
      <main className=" min-h-screen bg-white">

      </main>
    </Layout>
  );
}

export default withAuth(ManageRequests, "all", 'admin');
