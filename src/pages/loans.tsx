import CustomTable from "@/components/custom-table";
import FormInput, { FormSelect, FormTextArea, FormattedNumberInput } from "@/components/form-input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useLoggedInUser } from "@/data/auth";
import useLoans from "@/data/loans";
import { Formik } from "formik";
import { useState } from "react";
import { string, object, number } from "yup";
import { FiEye } from "react-icons/fi";

export default function LoansPage() {
  return (
    <div>
      <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 [&>*]:p-4 [&>*]:bg-white [&>*]:rounded-lg [&>*]:shadow [&_h2]:text-lg [&_h2]:mb-4">
        <li>
          <h2>Total loan requests</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total pending requests</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total approved loans</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total rejected requests</h2>
          <p>0</p>
        </li>
      </ul>
      <CustomTable<Loan>
        baseUrl="loans/"
        title="Loan Requests"
        columns={[
          {
            accessorFn: (row) => row.user_data.company.name,
            header: "Company",
          },
          {
            accessorKey: "request_type",
            header: "Request Type",
          },
          {
            accessorKey: "amount",
            header: "Amount",
            cell({ row: { original } }) {
              return (
                <>
                  {original.amount
                    ? `₦ ${original.amount.toLocaleString()}`
                    : `${original.num_of_bike?.toLocaleString()} ${original.type_of_bike}`}
                </>
              );
            },
          },

          {
            accessorKey: "created_at",
            header: "Request Date",
            cell({ row: { original } }) {
              return <>{new Date(original.created_at).toLocaleString()}</>;
            },
          },
          {
            accessorKey: "status",
            header: "Loan Status",
            cell({ row: { original } }) {
              return (
                <span className={`px-2 py-1 rounded-full ${ststusClass[original.status]}`}>{original.status}</span>
              );
            },
          },
          {
            header: "Actions",
            cell({ row: { original } }) {
              return (
                <button>
                  <FiEye />
                </button>
              );
            },
          },
        ]}
        selectFilters={[
          {
            name: "request_type",
            label: "Request Type",
            options: [
              {
                label: "Purchase a bike",
                value: "Purchase a bike",
              },
              {
                label: "Get a bike loan",
                value: "Get a bike loan",
              },
              {
                label: "Business expansion loan",
                value: "Business expansion loan",
              },
              {
                label: "Get a delivery license",
                value: "Get a delivery license",
              },
            ],
          },
        ]}
      />
    </div>
  );
}

const ststusClass: Record<Loan["status"], string> = {
  pending: "bg-yellow-400 text-white",
  approved: "bg-green-400 text-white",
  declined: "bg-red-400 text-white",
};
