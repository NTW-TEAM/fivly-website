"use client";
import React from "react";
import ChartFunds from "./ChartFunds";
import ChartRepartition from "./ChartRepartition";

const DashboardChart: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div className="col-span-6 flex">
        <div className="h-full w-full">
          <ChartFunds />
        </div>
      </div>
      <div className="col-span-6 flex">
        <div className="h-full w-full">
          <ChartRepartition />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
