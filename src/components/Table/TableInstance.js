import { useMemo } from "react";
import {
  usePagination,
  useSortBy,
  useTable,
  useGlobalFilter,
} from "react-table";
import Table from "./Table";

const TableInstance = ({
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
      // manualGlobalFilter: true,
      pageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
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
      />
    );
  }
  return <>{component}</>;
};

export default TableInstance;
