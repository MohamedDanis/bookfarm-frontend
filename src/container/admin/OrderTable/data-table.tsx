"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useState } from "react";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// type Status = {
//   value: string
//   label: string
//   icon: LucideIcon
// }
 
// const statuses: Status[] = [
//   {
//     value: "Ordered",
//     label: "Ordered",
//     icon: HelpCircle,
//   },
//   {
//     value: "Dispatching",
//     label: "Dispatching",
//     icon: Circle,
//   },
//   {
//     value: "In-transit",
//     label: "In-transit",
//     icon: ArrowUpCircle,
//   },
//   {
//     value: "Delivered",
//     label: "Delivered",
//     icon: CheckCircle2,
//   },
//   {
//     value: "canceled",
//     label: "Canceled",
//     icon: XCircle,
//   },
// ]
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter orders..."
          value={(table.getColumn("orderId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("orderId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          defaultValue={
            (table.getColumn("status")?.getFilterValue() as string) ?? ""
          }
          onValueChange={(event: any) => {
            const currentFilterValue = table
              .getColumn("status")
              ?.getFilterValue() as string;
            const newFilterValue = currentFilterValue === "all" ? "" : event;
            table.getColumn("status")?.setFilterValue(newFilterValue);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter By Status " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={undefined as unknown as string}>All</SelectItem>
            <SelectItem value="Ordered">Ordered</SelectItem>
            <SelectItem value="Dispatching">Dispatching</SelectItem>
            <SelectItem value="In-transit">In-transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
