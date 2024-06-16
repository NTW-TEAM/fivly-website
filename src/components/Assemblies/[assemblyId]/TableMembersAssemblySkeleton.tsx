import React from "react";

const TableMembersAssemblySkeleton = () => {
  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="mb-4 text-2xl font-bold">Membres de l&apos;assemblée</h1>
      <div className="animate-pulse">
        <div className="mb-4 flex justify-between">
          <div className="h-10 w-full rounded bg-slate-700 sm:max-w-[44%]"></div>
          <div className="flex gap-3">
            <div className="h-10 w-24 rounded bg-slate-700"></div>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-16 rounded bg-slate-700"></div>
            <div className="h-6 w-10 rounded bg-slate-700"></div>
          </div>
        </div>
        <div className="border-gray-200 border-t">
          <div className="mt-2 grid grid-cols-6 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="col-span-1 h-6 rounded bg-slate-700"
              ></div>
            ))}
          </div>
          <div className="mt-2 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="col-span-1 h-6 rounded bg-slate-700"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableMembersAssemblySkeleton;
