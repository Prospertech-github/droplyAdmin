import React from "react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";
import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";
import useDashboard from "@/data/dashboard";

const statistics = [
  {
    bg: "bg-warning-500",
    text: "text-primary-500",
    img: shade1,
  },
  {
    bg: "bg-info-500",
    text: "text-danger-500",
    img: shade2,
  },
  {
    bg: "bg-primary-500",
    text: "text-primary-500",
    img: shade3,
  },
  {
    bg: "bg-success-500",
    text: "text-primary-500",
    img: shade4,
  },
];
const GroupChart3 = () => {
  const { data, isLoading } = useDashboard();
  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={1}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={2}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={3}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={4}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={5}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={6}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className={`${statistics[1].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[1].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Collections</span>
        <span className="block text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.revenue.total_revenue_all_time.toLocaleString(undefined, {
            style: "currency",
            currency: "NGN",
            currencyDisplay: "narrowSymbol",
          })}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>
              {data.revenue.total_revenue_this_month.toLocaleString(undefined, {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "narrowSymbol",
              })}{" "}
            </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
        </div>
        <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
          <Icon
            icon={
              data.revenue.total_revenue_this_month < data.revenue.total_revenue_last_month
                ? "heroicons:arrow-trending-down"
                : "heroicons:arrow-trending-up"
            }
          />{" "}
          <span className="text-xs">
            {Math.abs(
              (data.revenue.total_revenue_this_month - data.revenue.total_revenue_last_month) /
                data.revenue.total_revenue_last_month
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            from last month
          </span>
        </span>
      </div>
      <div className={`${statistics[3].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[3].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Revenue</span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.profits.total_profit_all_time.toLocaleString(undefined, {
            style: "currency",
            currency: "NGN",
            currencyDisplay: "narrowSymbol",
          })}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>
              {data.profits.total_profit_this_month.toLocaleString(undefined, {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "narrowSymbol",
              })}{" "}
            </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
        </div>
        <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
          <Icon
            icon={
              data.profits.total_profit_this_month < data.profits.total_profit_last_month
                ? "heroicons:arrow-trending-down"
                : "heroicons:arrow-trending-up"
            }
          />{" "}
          <span className="text-xs">
            {Math.abs(
              (data.profits.total_profit_this_month - data.profits.total_profit_last_month) /
                data.profits.total_profit_last_month
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            from last month
          </span>
        </span>
      </div>
      <div className={`${statistics[0].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[0].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Orders</span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.order.total_orders_all_time}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>{data.order.total_orders_this_month} orders </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
          <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
            <Icon
              icon={
                data.order.total_orders_this_month < data.order.total_orders_last_month
                  ? "heroicons:arrow-trending-down"
                  : "heroicons:arrow-trending-up"
              }
            />{" "}
            <span className="text-xs">
              {Math.abs(
                (data.order.total_orders_this_month - data.order.total_orders_last_month) /
                  data.order.total_orders_last_month
              ).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              from last month
            </span>
          </span>
        </div>
      </div>

      <div className={`${statistics[0].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[0].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Merchants</span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.merchants.total_merchants.toLocaleString()}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>{data.merchants.total_merchants_this_month.toLocaleString()} </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
        </div>
        <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
          <Icon
            icon={
              data.merchants.total_merchants_this_month < data.merchants.total_merchants_last_month
                ? "heroicons:arrow-trending-down"
                : "heroicons:arrow-trending-up"
            }
          />{" "}
          <span className="text-xs">
            {Math.abs(
              (data.merchants.total_merchants_this_month - data.merchants.total_merchants_last_month) /
                data.merchants.total_merchants_last_month
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            from last month
          </span>
        </span>
      </div>
      <div className={`${statistics[2].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[2].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Riders</span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.riders.total_riders.toLocaleString()}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>{data.riders.total_riders_this_month.toLocaleString()} </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
        </div>
        <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
          <Icon
            icon={
              data.riders.total_riders_this_month < data.riders.total_riders_last_month
                ? "heroicons:arrow-trending-down"
                : "heroicons:arrow-trending-up"
            }
          />{" "}
          <span className="text-xs">
            {Math.abs(
              (data.riders.total_riders_this_month - data.riders.total_riders_last_month) /
                data.riders.total_riders_last_month
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            from last month
          </span>
        </span>
      </div>

      <div className={`${statistics[2].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}>
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img src={statistics[3].img} alt="" draggable="false" className="w-full h-full object-contain" />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">Total Customers</span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.customers.total_customers.toLocaleString()}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <div className="text-sm">
            <span className={`mb-[2px]`}>{data.customers.total_customers_this_month.toLocaleString()} </span>
            <span className=" text-slate-600 dark:text-slate-300">this month</span>
          </div>
        </div>
        <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
          <Icon
            icon={
              data.customers.total_customers_this_month < data.customers.total_customers_last_month
                ? "heroicons:arrow-trending-down"
                : "heroicons:arrow-trending-up"
            }
          />{" "}
          <span className="text-xs">
            {Math.abs(
              (data.customers.total_customers_this_month - data.customers.total_customers_last_month) /
                (data.customers.total_customers_last_month || 1)
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            from last month
          </span>
        </span>
      </div>
    </>
  );
};

export default GroupChart3;
