import React, { useMemo } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import Checkbox from "./Checkbox";
import Table from "./Table";

const TableInstanceWithCheckbox = ({
  tableData,
  column,
  cPageSize,
  cSetPageSize,
  pageIndex,
  setPageIndex,
  pageCount,
  cSortBy,
  cSetSortBy,
  desc,
  setDesc,
  setSelectedRows,
}) => {
  const columns = useMemo(() => column, []);
  const data = useMemo(() => tableData, [tableData]);

  let component = <></>;

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: cPageSize,
        pageIndex,
        sortBy: cSortBy
          ? [
              {
                id: cSortBy,
                desc,
              },
            ]
          : [],
      },
      disableMultiSort: true,
      manualPagination: true,
      manualGlobalFilter: true,
      pageCount,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  if (tableData.length <= 0) {
    component = <p className="ml-4">No data found.</p>;
  } else {
    component = (
      <Table
        {...tableInstance}
        setPageIndex={setPageIndex}
        cSetPageSize={cSetPageSize}
        cSetSortBy={cSetSortBy}
        setDesc={setDesc}
        setSelectedRows={setSelectedRows}
      />
    );
  }
  return <>{component}</>;
};

export default TableInstanceWithCheckbox;