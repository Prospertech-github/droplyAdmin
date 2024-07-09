import CustomTable from "@/components/custom-table";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
  },
];

export default function Users() {
  return (
    <div>
      <CustomTable baseUrl="auth/users" columns={columns} title="Users" selectFilters={[]} />
    </div>
  );
}
