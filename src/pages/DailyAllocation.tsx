import React, { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useToast from "../hooks/useToast";
import TableInstance from "../components/Table/TableInstance";
import TableButtons from "../components/TableButtons/TableButtons";
import { useDailyAllocation } from "../contexts/DailyAllocationContext";
import UploadBtn from "../components/Buttons/UploadBtn";
import DownloadBtn from "../components/Buttons/DownloadBtn";

const DailyAllocation = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  const { dailyAllocation } = useDailyAllocation();

  const { showSuccess } = useToast();

  const intl = useIntl();

  // column
  const DAILY_ALLOCATION_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.distributorCode"
            defaultMessage={"Distributor Code"}
          />
        ),
        accessor: "distributorCode",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.shipToCode"
            defaultMessage={"Ship To Code"}
          />
        ),
        accessor: "shipToCode",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.skuCode"
            defaultMessage={"SKU Code"}
          />
        ),
        accessor: "skuCode",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.productId"
            defaultMessage={"Product ID"}
          />
        ),
        accessor: "productId",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.startDate"
            defaultMessage={"Start Date"}
          />
        ),
        accessor: "startDate",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.endDate"
            defaultMessage={"End Date"}
          />
        ),
        accessor: "endDate",
      },
      {
        Header: (
          <FormattedMessage
            id="dailyAllocationTable.allocationQuantity"
            defaultMessage={"Allocation Quantity"}
          />
        ),
        accessor: "allocationQuantity",
        Cell: ({ value }: any) => {
          const [v, setV] = useState(parseInt(value));

          return (
            <div>
              <input
                className="w-24 p-1 rounded border outline-none"
                type="number"
                max={5}
                value={v}
                onChange={(e) => setV(parseInt(e.target.value))}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const handleSubmit = useCallback(() => {
    showSuccess(
      intl.formatMessage({
        id: "allocationsApproved",
        defaultMessage: "Allocations approved",
      })
    );
  }, []);

  return (
    <div className="forecast page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />

        <button className="btn bg-green-500" onClick={handleSubmit}>
          <FormattedMessage id="approve" defaultMessage={"Approve"} />
        </button>
      </TableButtons>

      <TableInstance
        tableData={dailyAllocation}
        column={DAILY_ALLOCATION_COLUMN}
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

export default DailyAllocation;
