import { File } from "@/types/file";
import { FaDownload, FaEye } from "react-icons/fa";
import { FaD } from "react-icons/fa6";

const FilesData: File[] = [
  {
    title: "Document 1",
    size: "1.2 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document 2",
    size: "1.2 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document 3",
    size: "1.2 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document 4",
    size: "1.2 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document 5",
    size: "1.2 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
];

const TableDocument = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Fichiers du dossier &quot;Polygones&quot;
          </h2>
          <a
            className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            href="#"
          >
            Ajouter un document à ce dossier
          </a>
        </div>
        <table className="mt-4 w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Titre
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Taille
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Date d&apos;import
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Importé par
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {FilesData.map((file, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {file.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{file.size}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {file.dateImport}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {file.userImport}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <FaDownload />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDocument;
