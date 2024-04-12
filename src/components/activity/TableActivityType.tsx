import { TypeActivity } from "@/types/typeActivity";
import { FaEye, FaTrash } from "react-icons/fa";

const TypeActivityData: TypeActivity[] = [
  {
    id: 1,
    name: "Type 1",
  },
];

const TableActivityType = () => {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Liste des types d&apos;activités
        </h2>
        <a
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          href="#"
        >
          Ajouter un type d&apos;activité
        </a>
      </div>
      <table className="mt-4 w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
              Nom
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {TypeActivityData.map((activityType, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {activityType.name}
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                    <FaEye />
                  </button>
                  <button className="hover:text-primary">
                    <FaTrash />
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

export default TableActivityType;
