import { Layout } from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import Seo from "~/components/Seo";
import withAuth from "~/components/hoc/withAuth";

const UserHome = () => {
  return (
    <Layout>
      <Seo templateTitle="Dashboard User" />
      <main className=" min-h-[100vh]">
        <div className="md:container mx-auto my-10">
          <div className="bg-white p-5 rounded-md drop-shadow-md">
            <PageTitle title="Dashboard" />
            <div className="flex flex-col items-center justify-center w-full">
              {/* content */}
            </div>
          </div>
        </div>
      </main>
    </Layout >
  );
}

export default withAuth(UserHome, 'all', 'user');