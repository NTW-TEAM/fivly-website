import {ApexOptions} from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartRepartitionProps {
  title?: string;
  labels?: string[];
  series?: number[];
  colors?: string[];
}

const ChartRepartition: React.FC<ChartRepartitionProps> = ({ title, labels, series, colors }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: colors,
    labels: labels,
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
            width: 380,
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

  if(!series || !labels || !colors) {
    return null;
  }
  const total = series.reduce((acc, value) => acc + value, 0);
  const percentages = series.map((value) => (value / total) * 100);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {labels.map((label, index) => (
          <div key={index} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className={`mr-2 block h-3 w-full max-w-3 rounded-full`} style={{ backgroundColor: colors[index] }}></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {label} </span>
                <span> {percentages[index].toFixed(2)}% </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartRepartition;