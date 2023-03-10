import React from "react";
import { useMemo } from "react";
import distributors from "../../data/distributors.json";
import { useState } from "react";
import TableInstance from "../../components/Table/TableInstance";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import TableButtons from "../../components/TableButtons/TableButtons";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import UtilityBtn from "../../components/UtilityBtn/UtilityBtn";
import useToast from "../../hooks/useToast";
import DownloadBtn from "../../components/Buttons/DownloadBtn";
import UploadBtn from "../../components/Buttons/UploadBtn";

const Distributors = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  const intl = useIntl();

  const navigator = useNavigate();

  const { showSuccess } = useToast();

  // column
  const DISTRIBUTORS_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.distributorCode"
            defaultMessage={"Distributor Code"}
          />
        ),
        accessor: "distributorCode",
        Cell: ({ value }: any) => {
          return (
            <Link
              className="text-blue-500 underline"
              to={`/distributors/${value}`}
            >
              {value}
            </Link>
          );
        },
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.shipToCode"
            defaultMessage={"Ship to Code"}
          />
        ),
        accessor: "shipToCode",
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.customerName"
            defaultMessage={"Customer Name"}
          />
        ),
        accessor: "customerName",
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.priority"
            defaultMessage={"Priority"}
          />
        ),
        accessor: "priority",
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.shelfLife"
            defaultMessage={"Shelf Life"}
          />
        ),
        accessor: "shelfLife",
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.leadTime"
            defaultMessage={"Lead Time"}
          />
        ),
        accessor: "leadTime",
      },
      {
        Header: (
          <FormattedMessage
            id="distributorsTable.targetDays"
            defaultMessage={"Target Days"}
          />
        ),
        accessor: "targetDays",
      },
      {
        accessor: "actions",
        Cell: ({ row }: any) => {
          return (
            <div className="flex items-center gap-x-2">
              <button>
                <UtilityBtn
                  Icon={FiEdit}
                  iconColor={"#222222"}
                  onClick={() => {
                    navigator(`/distributors/${row.original.distributorCode}`, {
                      state: { edit: true },
                    });
                  }}
                  label={intl.formatMessage({
                    id: "edit",
                    defaultMessage: "Edit",
                  })}
                  uniqueId="distributors-edit"
                />
              </button>
              <button>
                <UtilityBtn
                  Icon={FiTrash}
                  iconColor={"#d0312d"}
                  onClick={() => {
                    showSuccess(
                      intl.formatMessage({
                        id: "distributorHasBeenDeletedSuccessfully",
                        defaultMessage:
                          "Distributor has been deleted successfully",
                      })
                    );
                  }}
                  label={intl.formatMessage({
                    id: "delete",
                    defaultMessage: "Delete",
                  })}
                  uniqueId="distributors-delete"
                />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="distributors page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />

        <Link to="/distributors/create" className="btn btn-primary">
          <FormattedMessage
            id="addDistributor"
            defaultMessage={"Add Distributor"}
          />
        </Link>
      </TableButtons>
      <TableInstance
        tableData={distributors}
        column={DISTRIBUTORS_COLUMN}
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

export default Distributors;
