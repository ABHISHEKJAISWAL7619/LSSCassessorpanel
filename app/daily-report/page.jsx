import DailyReport from "@/ui/pages/DailyReport";
import MainLayout from "@/ui/templates/MainLayout";

const page = async ({ searchParams }) => {
  let data = await searchParams;
  return (
    <MainLayout>
      <DailyReport page={data.page} />
    </MainLayout>
  );
};

export default page;
