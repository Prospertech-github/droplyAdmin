import CustomTable from "@/components/custom-table";
import { ColumnDef } from "@tanstack/react-table";
import { FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "row.user_info.email",
    header: "Email",
    id: "email",
    cell(props) {
      return <div>{props.row?.original.user_info?.email}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell(props) {
      return (
        <div
          className={`px-2 py-1 rounded-full inline-flex text-xs ${
            statusMap[props.row.original.status]?.className ||
            "bg-yellow-500 text-white"
          }`}
        >
          {statusMap[props.row.original.status]?.label || "Pending"}
        </div>
      );
    },
  },
  { accessorKey: "commission" },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      return (
        <span>{new Date(row.original.date_created).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "rider_count",
    header: "Riders",
  },
  {
    header: "Actions",
    cell({ row: { original } }) {
      return (
        <Link to={original.id}>
          <FiEye />
        </Link>
      );
    },
  },
];
export default function Merchants() {
  const navigate = useNavigate();

  return (
    <div>
      <CustomTable
        baseUrl="auth/organizations"
        columns={columns}
        title="Merchants"
        selectFilters={[]}
        onClick={(row) => navigate(`/merchants/${(row?.original as any).id}`)}
      />
    </div>
  );
}

const statusMap: Record<
  Organization["status"],
  {
    className: string;
    label: string;
  }
> = {
  approved: {
    className: "bg-green-500 text-white",
    label: "Approved",
  },
  pending: {
    className: "bg-yellow-500 text-white",
    label: "Pending",
  },

  declined: {
    className: "bg-red-500 text-white",
    label: "Rejected",
  },
};
