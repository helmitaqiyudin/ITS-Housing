import { Layout } from "~/components/Layout";
import MapComponent from "~/components/TESTMAP";
import PageTitle from "~/components/PageTitle";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const ViewMap = () => {
  return (
    <Layout>
      <Seo templateTitle="View Map" />
      <main className=" min-h-[100vh]">
        <div className="md:container mx-auto my-10">
          <div className="bg-white p-5 rounded-md drop-shadow-md">
            <PageTitle title="View Map" />
            <MapComponent />
          </div>
        </div>
      </main>
    </Layout >
  );
}

export default withAuth(ViewMap, 'all', 'admin');