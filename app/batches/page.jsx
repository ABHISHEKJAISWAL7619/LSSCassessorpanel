import Batches from "@/ui/pages/Batches";
import MainLayout from "@/ui/templates/MainLayout";

const page = async ({ searchParams }) => {
  let data = await searchParams;
  return (
    <MainLayout>
      <Batches page={data.page} />
    </MainLayout>
  );
};

export default page;
