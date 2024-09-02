import { useParams } from "react-router-dom";
import { useRiderActivity } from "@/data/riders";

export const lists = [
  {
    title: "Picked up order 123",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    date: "Sep 20, 2021 ",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Delivered order 123",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Logged in",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Changed password",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Arrived at pickup location",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
];

const TrackingParcel = () => {
  const { id } = useParams();
  const { data, isLoading } = useRiderActivity(id || "", {
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && !!data.length ? (
        <ul className="relative ltr:pl-2 rtl:pr-2">
          {data.map((item, i) => (
            <li
              key={i}
              className={`before:opacity-100 ltr:border-l-2 rtl:border-r-2 border-slate-100 dark:border-slate-700 pb-4 last:border-none ltr:pl-[22px] rtl:pr-[22px] relative before:absolute ltr:before:left-[-8px] rtl:before:-right-2 before:top-[0px] before:rounded-full before:w-4 before:h-4 before:bg-slate-900 dark:before:bg-slate-600 before:leading-[2px] before:content-[url('@/assets/images/all-img/ck.svg')] `}
            >
              <div className="p-[10px] relative top-[-20px]">
                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                  {item.action}
                </h2>
                <p className="text-xs capitalize dark:text-slate-400">
                  {item.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No Recent Activity</p>
        </div>
      )}
    </>
  );
};

export default TrackingParcel;
