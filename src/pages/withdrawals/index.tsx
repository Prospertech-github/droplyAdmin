import CustomTable from "@/components/custom-table";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.user_data?.name,
  },
  {
    accessorKey: "bank name",
    accessorFn: (row) => row.bank_?.bank_name,
  },
  {
    accessorKey: "amount",
    accessorFn: (row) =>
      row.amount.toLocaleString(undefined, {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "narrowSymbol",
      }),
  },
  {
    accessorKey: "status",
    cell({ row: { original } }) {
      return (
        <span
          className={`px-2 py-1 rounded-full ${
            statusClass[original.status as keyof typeof statusClass]
          }`}
        >
          {original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "created at",
    cell({ row: { original } }) {
      return <>{new Date(original.created_at).toLocaleString()}</>;
    },
  },
];

export default function WithDrawals() {
  return (
    <CustomTable
      baseUrl="withdrawal/requests"
      columns={columns}
      title="Withdrawals Requests"
      selectFilters={[]}
    />
  );
}

const statusClass: Record<Loan["status"], string> = {
  pending: "bg-yellow-400 text-white",
  approved: "bg-green-400 text-white",
  declined: "bg-red-400 text-white",
};
