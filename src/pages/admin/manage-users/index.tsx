import { Layout } from "~/components/Layout";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

function ManageUsers() {
  return (
    <Layout>
      <Seo templateTitle="Daftar User" />
      <main className=" min-h-screen bg-white">

      </main>
    </Layout>
  );
}

export default withAuth(ManageUsers, "all", 'admin');
