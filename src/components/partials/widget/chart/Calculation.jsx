import React, { useState } from "react";
import { colors } from "@/constant/data";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { useDashboardPlatform } from "@/data/dashboard";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "@/components/ui/Card";

const Calculation = ({ height = 550, view }) => {
  const [isDark] = useDarkMode();
  const { data, isLoading } = useDashboardPlatform();

  if (isLoading) {
    return <div className="h-80 bg-slate-400 animate-pulse"></div>;
  }
  if (!data) {
    return (
      <div className="h-80">
        <h4>We couldn't load the platform data</h4>
      </div>
    );
  }

  const series = Object.values(data[view]);

  const options = {
    labels: ["Whatsapp", "Mobile App"],
    dataLabels: {
      enabled: true,
    },

    colors: [colors.success, colors.warning, "#A3A1FB"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <Chart options={options} series={series} type="pie" height={height} />
    </>
  );
};

const merMap = {
  this_month: "This Month",
  this_year: "This Year",
  all_time: "All Time",
};

export default function TopPlatform() {
  const [merPer, setMerPer] = useState("this_month");

  return (
    <Card>
      <header className="md:flex md:space-y-0 space-y-4">
        <h6 className="flex-1 text-slate-900 dark:text-white capitalize">Order platforms</h6>
        <div className="flex-none">
          <Listbox value={merPer} onChange={setMerPer}>
            <div className="relative">
              <Listbox.Button className="text-lg inline-flex items-center justify-center border py-1 px-2 border-slate-200 dark:border-slate-700 rounded dark:text-slate-400">
                {merMap[merPer]} <Icon icon="heroicons-outline:dots-vertical" />
              </Listbox.Button>
              <Listbox.Options className="z-10 w-[140px] absolute right-0 mt-1 max-h-60 overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Object.entries(merMap).map(([key, value]) => (
                  <Listbox.Option key={key} value={key} className="p-2 cursor-pointer">
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </header>
      <div className="legend-ring">
        <Calculation view={merPer} />
      </div>
    </Card>
  );
}
