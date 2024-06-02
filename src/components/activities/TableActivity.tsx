import { Activity } from "@/types/activity";
import { FaEye } from "react-icons/fa";

const ActivityData: Activity[] = [
  {
    id: 1,
    title: "Type 1",
    description: "Description 1",
    beginDate: "2021-09-01",
    endDate: "2021-09-02",
    activityType: "Type 1",
    creator: "Creator 1",
  },
];

const TableActivity = () => {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Liste des activités
        </h2>
        <a
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          href="#"
        >
          Ajouter une activité
        </a>
      </div>
      <table className="mt-4 w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
              Titre
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Description
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Date de début
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Date de fin
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ActivityData.map((activity, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {activity.title}
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {activity.description.length > 25
                    ? activity.description.slice(0, 25) + "..."
                    : activity.description}
                </p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {activity.beginDate}
                </p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{activity.endDate}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                    <FaEye />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableActivity;
