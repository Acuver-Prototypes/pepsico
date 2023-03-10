import React from "react";
import { useMemo } from "react";
import { stripText } from "../utils";
import stocksAvailable from "../data/stocksAvailable.json";
import { useState } from "react";
import TableInstance from "../components/Table/TableInstance";
import { formatMessage } from "@formatjs/intl";
import { FormattedMessage } from "react-intl";
import TableButtons from "../components/TableButtons/TableButtons";
import UploadBtn from "../components/Buttons/UploadBtn";
import DownloadBtn from "../components/Buttons/DownloadBtn";

const StocksAvailable = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  // column
  const STOCKS_AVAILABLE_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.materialNo"
            defaultMessage={"Material No:"}
          />
        ),
        accessor: "materialNo",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.materialDescription"
            defaultMessage={"Material Description"}
          />
        ),
        accessor: "materialDescription",
        Cell: ({ value }: any) => stripText(value, 26),
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.baseUnit"
            defaultMessage={"Base Unit"}
          />
        ),
        accessor: "baseUnit",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.total"
            defaultMessage={"Total ATP"}
          />
        ),
        accessor: "totalATP",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.atp7101"
            defaultMessage={"ATP-7101"}
          />
        ),
        accessor: "atp7101",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.atp7102"
            defaultMessage={"ATP-7102"}
          />
        ),
        accessor: "atp7102",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.atp7104"
            defaultMessage={"ATP-7104"}
          />
        ),
        accessor: "atp7104",
      },
      {
        Header: (
          <FormattedMessage
            id="stocksAvailableTable.atp7106"
            defaultMessage={"ATP-7106"}
          />
        ),
        accessor: "atp7106",
      },
    ],
    []
  );

  return (
    <div className="stocks page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />
      </TableButtons>

      <TableInstance
        tableData={stocksAvailable}
        column={STOCKS_AVAILABLE_COLUMN}
        cPageSize={cPageSize}
        cSetPageSize={cSetPageSize}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageCount={-1} // do calculation here
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
      />
    </div>
  );
};

export default StocksAvailable;
