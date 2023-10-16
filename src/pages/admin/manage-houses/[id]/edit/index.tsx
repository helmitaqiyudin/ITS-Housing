import { Navbar } from "~/components/Navbar";
import PageTitle from "~/components/PageTitle";
import Seo from "~/components/Seo";

function EditHouse() {
  return (
    <Navbar>
      <Seo templateTitle="Edit Rumah Negara" />
      <main className=" min-h-screen bg-white">
        <PageTitle title="Edit Rumah Negara" />
        
      </main>
    </Navbar>
  );
}

export default EditHouse
