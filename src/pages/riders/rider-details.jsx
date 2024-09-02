import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/Table/team-table";
import CalendarView from "@/components/partials/widget/CalendarView";
import Button from "@/components/ui/Button";
import BasicArea from "@/components/partials/widget/chart/BasicArea";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import { useRider } from "@/data/riders";
import dayjs from "dayjs";

// const statistics = [
//   {
//     title: "Wallet Balance",
//     count: "₦86,954",
//     bg: "bg-info-500",
//     text: "text-danger-500",
//   },
//   {
//     title: "Deliveries",
//     count: "354",
//     bg: "bg-warning-500",
//     text: "text-primary-500",
//   },{
//     title: "Rating",
//     count: "4.5",
//     bg: "bg-success-500",
//     text: "text-primary-500",
//   },
//   {
//     title:"Total Earnings",
//     count:"₦86,954",
//     bg:"bg-info-500",
//     text:"text-danger-500",
//   }
// ]

const RiderDetailsPage = () => {
  const { id } = useParams();
  const { rider } = useLoaderData();

  console.log(rider);

  // if (rider?.isLoading) {
  //   return (
  //     <>
  //       <div className="space-y-5">
  //         <Card className="h-24 animate-pulse w-full"></Card>
  //         <Card className="h-24 animate-pulse w-full"></Card>
  //         <Card className="h-24 animate-pulse w-full"></Card>
  //         <Card className="h-24 animate-pulse w-full"></Card>
  //         <Card className="h-24 animate-pulse w-full"></Card>
  //       </div>
  //     </>
  //   );
  // }

  if (!rider) {
    return (
      <div className="h-full flex flex-col p-6 lg:p-16 justify-center items-center text-center">
        <div className="text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Rider not found
        </div>
        <div className="text-xl text-slate-600 dark:text-slate-300">
          The rider you are looking for does not exist.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5">
        <Card className="col-span-full">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-6">
            <div>
              <span className="w-24 rounded-full flex h-24 justify-center items-center bg-sky-200 dark:bg-purple-900 capitalize">
                {rider.user.first_name[0]}
                {rider.user.last_name[0]}
              </span>
            </div>
            <div>
              <address className="flex flex-col justify-between">
                <h2 className="-mt-4">
                  <span className="text-xl font-semibold text-slate-800 dark:text-slate-100 capitalize">
                    {rider.user.first_name} {rider.user.last_name}
                  </span>
                </h2>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {rider.user.phone}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {rider.user.email}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Lagos, Nigeria
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Member since{" "}
                    {dayjs(rider.user.date_joined).format("MMMM, YYYY")}.
                  </span>
                </p>
              </address>
            </div>
            <div className="flex flex-col justify-between items-end gap-4">
              {rider.is_online && (
                <span className="flex items-center gap-1 text-xs">
                  Online{" "}
                  <span className="bg-green-500 h-2 w-2 rounded-full inline-block" />
                </span>
              )}
              <Button className="bg-orange-200 dark:bg-orange-400">
                Suspend Rider
              </Button>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <Card title="Deliveries" className="h-full">
            <BasicArea />
          </Card>
          <Card title="Activity" headerslot={<SelectMonth />} className="">
            <TrackingParcel />
          </Card>
        </div>
        <Card className="h-full">
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-4">
            <GroupChart4 />
          </div>
        </Card>
      </div>
      <div className="col-span-full">
        <ExampleTwo title="Latest orders" rider={id} />
      </div>
      {/* <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Team members" noborder>
            <TeamTable />
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Files" headerslot={<SelectMonth />}>
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {files.map((item, i) => (
                <li key={i} className="block py-[8px]">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
                      <div className="flex-none">
                        <div className="h-8 w-8">
                          <img
                            src={item.img}
                            alt=""
                            className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="block text-slate-600 text-sm dark:text-slate-300">{item.title}</span>
                        <span className="block font-normal text-xs text-slate-500 mt-1">{item.date}</span>
                      </div>
                    </div>
                    <div className="flex-none">
                      <button type="button" className="text-xs text-slate-900 dark:text-white">
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

export default RiderDetailsPage;
