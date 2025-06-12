import Image from "next/image";

const Notifications = () => {
  return (
    <section className="space-y-6">
      <h2 className="font-bold text-3xl">Notifications</h2>
      <div className="bg-white rounded-xl border  border-quinary">
        <div className="overflow-x-auto py-4">
          <div className="min-w-[1000px] lg:min-w-full">
            <table className="w-full">
              <thead className="bg-white ">
                <tr className="border-b border-quinary">
                  <th>ID's</th>
                  <th>NAME</th>
                  <th>Message</th>
                  <th>Attatchment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-quinary">
                  <td>Admin</td>
                  <td className="text-nowrap">Gurmeet Kaur</td>
                  <td className="text-justify">
                    It appears that your performance input hasn't been updated.
                    Kindly ensure it is updated on a daily basis moving forward.{" "}
                  </td>
                  <td>No</td>
                  <td className="text-nowrap">12 May 2025</td>
                </tr>
                <tr className="border-b border-quinary">
                  <td>Admin</td>
                  <td className="text-nowrap">Gurmeet Kaur</td>
                  <td className="text-justify">
                    It appears that your performance input hasn't been updated.
                    Kindly ensure it is updated on a daily basis moving forward.{" "}
                  </td>
                  <td>No</td>
                  <td className="text-nowrap">12 May 2025</td>
                </tr>
                <tr className="border-b border-quinary">
                  <td>Admin</td>
                  <td className="text-nowrap">Gurmeet Kaur</td>
                  <td className="text-justify">
                    It appears that your performance input hasn't been updated.
                    Kindly ensure it is updated on a daily basis moving forward.{" "}
                  </td>
                  <td>No</td>
                  <td className="text-nowrap">12 May 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
