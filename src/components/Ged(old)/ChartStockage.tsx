import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF"],
  labels: ["Partager", "Mes Documents", "Disponible"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 250,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartStockage: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [19, 1, 80],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [19, 1, 80],
    }));
  };
  handleReset;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Espace de stockage
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex sm:flex-row flex-col sm:justify-center sm:items-center ">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
          <div className="flex sm:flex-col flex-row gap-4 mt-4">

            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#3C50E0]"></span>
              <p className="font-small flex w-full justify-between text-sm text-black dark:text-white">
                <span> Stockage partagé </span>
                <span> 19 %</span>
              </p>
            </div>

            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Mes Documents </span>
                <span> 1 %</span>
              </p>
            </div>

            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Espace disponible </span>
                <span> 80 %</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ChartStockage;
