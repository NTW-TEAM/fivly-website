import { FaFolder, FaShareAlt } from "react-icons/fa";

const SideBarGed = () => {
  return (
    <div className="col-span-1 rounded-sm border border-stroke bg-white px-2 pb-2 pt-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4.5">
      <div className="container">
        <h1 className="text-center text-2xl font-bold">GED</h1>
        <p className="mt-2 text-center text-xs">
          Gestion éléctronique des documents
        </p>
        <hr className="mb-3 mt-3 border-stroke" />
      </div>

      <div className="container">
        <h3 className="mt-6 text-base font-bold">
          <FaShareAlt className="mr-2 inline-block" /> PARTAGE
        </h3>

        <div className="mt-4 flex flex-col justify-between space-y-4">
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Dossier 1
          </button>
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Dossier 2
          </button>
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Dossier 3
          </button>
        </div>
      </div>

      <div className="container">
        <h3 className="mt-6 text-base font-bold">
          <FaFolder className="mr-2 inline-block" /> DOCUMENTS
        </h3>

        <div className="mt-4 flex flex-col justify-between space-y-4">
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Polygones
          </button>
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Document 2
          </button>
          <button className="w-full cursor-pointer rounded-lg border border-primary p-2 dark:text-white transition hover:bg-opacity-90">
            Document 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarGed;
