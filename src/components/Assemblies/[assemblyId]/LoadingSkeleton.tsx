import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
      <div className="flex animate-pulse flex-col space-y-4">
        <div className="mb-2 h-6 w-3/4 rounded bg-slate-700"></div>
        <div className="space-y-2">
          <div className="h-4 w-1/2 rounded bg-slate-700"></div>
          <div className="h-4 w-1/4 rounded bg-slate-700"></div>
          <div className="h-4 w-1/3 rounded bg-slate-700"></div>
          <div className="h-4 w-1/4 rounded bg-slate-700"></div>
          <div className="h-4 w-1/2 rounded bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
