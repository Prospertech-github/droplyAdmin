import { useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { axios } from "@/utils/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "./ui/Button";
import GlobalFilter from "@/pages/table/react-tables/GlobalFilter";
import { useNavigate } from "react-router-dom";

type CustomTableProps<Data> = {
  columns: ColumnDef<Data>[];
  baseUrl: string;
  selectFilters?: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  title: string;
  onClick?: (row: Row<Data>) => void;
};
export default function CustomTable<Data>({
  baseUrl,
  title,
  columns,
  selectFilters,
  onClick,
}: CustomTableProps<Data>) {
  const navigate = useNavigate();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    limit: pageSize,
    offset: pageIndex * pageSize,
  } as Record<string, any>);

  const { data, isLoading, isError } = useQuery<Paginated<Data>>(
    [baseUrl, filters],
    () => axios.get(baseUrl, { params: filters }).then((res) => res.data),
    { keepPreviousData: true }
  );

  const updateFilters = useCallback(
    (e: { target: { name: string; value: string } }) => {
      setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      limit: pageSize,
      offset: pageIndex * pageSize,
    }));
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    pageCount: data?.count
      ? data.count % pageSize === 0
        ? data.count / pageSize
        : Math.floor(data.count / pageSize) + 1
      : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: false,
  });

  const headerGroups = table.getHeaderGroups();
  return (
    // @ts-ignore
    <Card
      title={title}
      headerslot={
        <div className="items-center flex gap-2">
          <GlobalFilter filter={""} setFilter={() => console.log("")} />
          {!!selectFilters?.length && (
            <Button className="btn btn-dark py-2">Filter</Button>
          )}
        </div>
      }
    >
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                {headerGroups.map((headerGroup, idx) => (
                  <tr key={idx}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        scope="col"
                        className="table-th whitespace-nowrap"
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={99}>
                      <p className="text-center py-6">Loading...</p>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={99}>
                      <p className="text-center py-6">
                        We couldn't load the data
                      </p>
                    </td>
                  </tr>
                ) : data?.results?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className="cursor-pointer"
                        onClick={() => onClick?.(row)}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id} className="table-td">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={99}>
                      <p className="text-center py-6">No data found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {pageIndex + 1} of {table.getPageOptions().length}
            </span>
          </span>
        </div>
        <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !table.getCanPreviousPage()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon="heroicons:chevron-double-left-solid" />
            </button>
          </li>
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !table.getCanPreviousPage()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
          </li>
          {table.getPageOptions().map((page, pageIdx) => (
            <li key={pageIdx}>
              <button
                aria-current="page"
                className={` ${
                  pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                onClick={() => table.setPageIndex(pageIdx)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !table.getCanNextPage() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </li>
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              onClick={() => data?.count ?? 0 - 1}
              disabled={!table.getCanNextPage()}
              className={` ${
                !table.getCanNextPage() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Icon icon="heroicons:chevron-double-right-solid" />
            </button>
          </li>
        </ul>
      </div>
    </Card>
  );
}
