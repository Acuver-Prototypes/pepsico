import React from "react";
import { useMemo } from "react";
import orders from "../data/orders.json";
import { useState } from "react";
import TableInstance from "../components/Table/TableInstance";
import { FormattedMessage } from "react-intl";
import TableButtons from "../components/TableButtons/TableButtons";
import DownloadBtn from "../components/Buttons/DownloadBtn";
import UploadBtn from "../components/Buttons/UploadBtn";

const OrderHistory = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  const getColor = (status: string) => {
    if (status === "CREATED") {
      return "bg-purple-100 text-purple-500";
    } else if (status === "SHIPPED") {
      return "bg-yellow-100 text-yellow-500";
    } else {
      return "bg-green-100 text-green-500";
    }
  };

  // column
  const ORDER_HISTORY_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="orderHistoryTable.orderNo"
            defaultMessage="Order No."
          />
        ),
        accessor: "orderNo",
      },
      {
        Header: (
          <FormattedMessage
            id="orderHistoryTable.distributorCode"
            defaultMessage="Distributor Code"
          />
        ),
        accessor: "distributorCode",
      },
      {
        Header: (
          <FormattedMessage
            id="orderHistoryTable.shipToCode"
            defaultMessage="Ship to Code"
          />
        ),
        accessor: "shipToCode",
      },
      {
        Header: (
          <FormattedMessage
            id="orderHistoryTable.shipmentNo"
            defaultMessage="Shipment No."
          />
        ),
        accessor: "shipmentNo",
      },
      {
        Header: (
          <FormattedMessage id="orderHistoryTable.city" defaultMessage="City" />
        ),
        accessor: "city",
      },
      {
        Header: (
          <FormattedMessage
            id="orderHistoryTable.status"
            defaultMessage="Status"
          />
        ),
        accessor: "status",
        Cell: ({ value }: any) => {
          return (
            <div className="flex items-center justify-start text-xs">
              <div
                className={`status px-2 py-1 rounded-full ${getColor(value)}`}
              >
                {value}
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="order-history page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />
      </TableButtons>
      <TableInstance
        tableData={orders}
        column={ORDER_HISTORY_COLUMN}
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

export default OrderHistory;
