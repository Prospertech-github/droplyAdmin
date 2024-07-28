import React, { useState } from "react";

import Card from "@/components/ui/Card";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import SelectMonth from "@/components/partials/SelectMonth";
import StackBarChart from "@/components/partials/widget/chart/stack-bar";
import Calculation from "@/components/partials/widget/chart/Calculation";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import useDashboard, { useDashboardChart } from "@/data/dashboard";
import { Link, useNavigate } from "react-router-dom";
import RevenueChart from "@/components/partials/widget/chart/revenue-chart";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function DashboardPage() {
  const dashboard = useDashboard();
  // useDashboardChart();

  if (dashboard.isError) {
    return <div>Error loading data</div>;
  }
  return (
    <div>
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-3 2xl:grid-cols-6 md:grid-cols-2 col-span-1 gap-3">
                <GroupChart3 />
              </div>
            </Card>
          </div>
          <div className="col-span-12 gap-5 grid lg:grid-cols-[2fr,1fr]">
            <StackBarChart />
            <Calculation />
          </div>
          <div className="col-span-12 gap-5 grid lg:grid-cols-[1fr,2fr]">
            <TopMerchants />

            <RevenueChart />
          </div>
        </div>
        <ExampleTwo title="Pending orders" />
      </div>
    </div>
  );
}

function TopRiders({ view }) {
  const { data, isLoading } = useDashboard();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={1}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={2}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={3}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={4}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
      </>
    );
  }
  if (!data?.merchants?.total_merchants) {
    return (
      <div className="text-center flex flex-col gap-6 items-center justify-center h-32">
        <h4>You have no merchants yet</h4>
      </div>
    );
  }
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-start text-sm border-b border-slate-100 dark:border-slate-700">
            Name
          </th>
          <th className="text-end text-sm border-b border-slate-100 dark:border-slate-700">
            Deliveries
          </th>
        </tr>
      </thead>

      <tbody>
        {data.top_merchants[view].map((item) => (
          <tr key={item.rider__company__user__id}>
            <td className="text-sm border-b border-slate-100 dark:border-slate-700 py-2">
              {/* <Link to={`/riders/${item.id}`} className="flex items-center space-x-2"> */}
              <span>{item.rider__company__name}</span>
              {/* </Link> */}
            </td>
            <td className="text-end text-sm border-b border-slate-100 dark:border-slate-700 py-2">
              {item.order_count.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const merMap = {
  this_month: "This Month",
  this_year: "This Year",
  all_time: "All Time",
};

function TopMerchants() {
  const [merPer, setMerPer] = useState("this_month");

  return (
    <Card>
      <header className="md:flex md:space-y-0 space-y-4">
        <h6 className="flex-1 text-slate-900 text-base 2xl:text-xl dark:text-white capitalize">
          Top Performing Merchants
        </h6>
        <div className="flex-none">
          <Listbox value={merPer} onChange={setMerPer}>
            <div className="relative">
              <Listbox.Button className="text-lg inline-flex items-center justify-center border py-1 px-2 border-slate-200 dark:border-slate-700 rounded dark:text-slate-400">
                {merMap[merPer]} <Icon icon="heroicons-outline:dots-vertical" />
              </Listbox.Button>
              <Listbox.Options className="z-10 w-[140px] absolute right-0 mt-1 max-h-60 overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Object.entries(merMap).map(([key, value]) => (
                  <Listbox.Option
                    key={key}
                    value={key}
                    className="p-2 cursor-pointer"
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </header>
      <div className="legend-ring">
        <TopRiders view={merPer} />
      </div>
    </Card>
  );
}
