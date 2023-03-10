import React from "react";
import { useMemo } from "react";
import productMapping from "../../data/productMapping.json";
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
  const PRODUCT_MAPPING_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="distributorCode" defaultMessage={"DIST_CD"} />
        ),
        accessor: "distributorCode",
        Cell: ({ value }: any) => {
          return (
            <Link
              className="text-blue-500 underline"
              to={`/product-mapping/${value}`}
            >
              {value}
            </Link>
          );
        },
      },
      {
        Header: (
          <FormattedMessage id="shipToCode" defaultMessage={"SHIPTO_CD"} />
        ),
        accessor: "shipToCode",
      },
      {
        Header: <FormattedMessage id="productCode" defaultMessage={"PRD_CD"} />,
        accessor: "productCode",
      },
      {
        Header: (
          <FormattedMessage
            id="productCodeOld1"
            defaultMessage={"PRD_CD_OLD1"}
          />
        ),
        accessor: "productCodeOld1",
      },
      {
        Header: (
          <FormattedMessage
            id="productCodeOld2"
            defaultMessage={"PRD_CD_OLD2"}
          />
        ),
        accessor: "productCodeOld2",
      },
      {
        Header: (
          <FormattedMessage
            id="productCodeOld3"
            defaultMessage={"PRD_CD_OLD3"}
          />
        ),
        accessor: "productCodeOld3",
      },
      {
        Header: (
          <FormattedMessage
            id="productCodeOld4"
            defaultMessage={"PRD_CD_OLD4"}
          />
        ),
        accessor: "productCodeOld4",
      },
      {
        Header: (
          <FormattedMessage
            id="productCodeOld5"
            defaultMessage={"PRD_CD_OLD5"}
          />
        ),
        accessor: "productCodeOld5",
      },
      {
        Header: <FormattedMessage id="active" defaultMessage={"Active"} />,
        accessor: "active",
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
                    navigator(
                      `/product-mapping/${row.original.distributorCode}`,
                      {
                        state: {
                          edit: true,
                        },
                      }
                    );
                  }}
                  label={intl.formatMessage({
                    id: "edit",
                    defaultMessage: "Edit",
                  })}
                  uniqueId="product-mapping-edit"
                />
              </button>
              <button>
                <UtilityBtn
                  Icon={FiTrash}
                  iconColor={"#d0312d"}
                  onClick={() => {
                    showSuccess(
                      intl.formatMessage({
                        id: "productMappingHasBeenDeletedSuccessfully",
                        defaultMessage:
                          "Product Mapping has been deleted successfully",
                      })
                    );
                  }}
                  label={intl.formatMessage({
                    id: "delete",
                    defaultMessage: "Delete",
                  })}
                  uniqueId="product-mapping-delete"
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
    <div className="product-mapping page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />

        <Link to="/product-mapping/create" className="btn btn-primary">
          <FormattedMessage id="addMapping" defaultMessage={"Add Mapping"} />
        </Link>
      </TableButtons>
      <TableInstance
        tableData={productMapping}
        column={PRODUCT_MAPPING_COLUMN}
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
