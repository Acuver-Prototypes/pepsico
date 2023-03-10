import React, { useCallback } from "react";
import { useMemo } from "react";
import products from "../../data/products.json";
import { useState } from "react";
import TableInstance from "../../components/Table/TableInstance";
import TableButtons from "../../components/TableButtons/TableButtons";
import useToast from "../../hooks/useToast";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import UtilityBtn from "../../components/UtilityBtn/UtilityBtn";
import { FiEdit, FiTrash } from "react-icons/fi";
import DownloadBtn from "../../components/Buttons/DownloadBtn";
import UploadBtn from "../../components/Buttons/UploadBtn";

const Products = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  const navigator = useNavigate();

  const intl = useIntl();

  const { showSuccess } = useToast();

  // column
  const PRODUCTS_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="productsTable.skuCode"
            defaultMessage={"SKU Code"}
          />
        ),
        accessor: "skuCode",
        Cell: ({ value }: any) => {
          return (
            <Link className="text-blue-500 underline" to={`/products/${value}`}>
              {value}
            </Link>
          );
        },
      },
      {
        Header: (
          <FormattedMessage
            id="productsTable.productId"
            defaultMessage={"Product ID"}
          />
        ),
        accessor: "productID",
      },
      {
        Header: (
          <FormattedMessage
            id="productsTable.description"
            defaultMessage={"Description"}
          />
        ),
        accessor: "materialDescription",
      },
      {
        Header: (
          <FormattedMessage
            id="productsTable.unitOfMeasure"
            defaultMessage={"Unit Of Measure"}
          />
        ),
        accessor: "baseUnit",
      },
      {
        Header: (
          <FormattedMessage id="productsTable.moq" defaultMessage={"MOQ"} />
        ),
        accessor: "moq",
      },
      {
        Header: (
          <FormattedMessage
            id="productsTable.weight"
            defaultMessage={"Weight"}
          />
        ),
        accessor: "weight",
      },
      {
        Header: (
          <FormattedMessage
            id="productsTable.seasonalityFactor"
            defaultMessage={"Seasonality Factor"}
          />
        ),
        accessor: "seasonalityFactor",
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
                    navigator(`/products/${row.original.skuCode}`, {
                      state: {
                        edit: true,
                      },
                    });
                  }}
                  label="Edit"
                  uniqueId="products-edit"
                />
              </button>
              <button>
                <UtilityBtn
                  Icon={FiTrash}
                  iconColor={"#d0312d"}
                  onClick={() => {
                    showSuccess(
                      intl.formatMessage({
                        id: "productHasBeenDeletedSuccessfully",
                        defaultMessage: "Product has been deleted successfully",
                      })
                    );
                  }}
                  label="Delete"
                  uniqueId="products-delete"
                />
              </button>
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
        id: "savedSuccessfully",
        defaultMessage: "Saved successfully",
      })
    );
  }, []);

  return (
    <div className="products page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />

        <Link to="/products/create" className="btn btn-primary">
          <FormattedMessage id="addProduct" defaultMessage={"Add Product"} />
        </Link>
        <button className="btn bg-green-500" onClick={handleSubmit}>
          <FormattedMessage id="save" defaultMessage={"Save"} />
        </button>
      </TableButtons>

      <TableInstance
        tableData={products}
        column={PRODUCTS_COLUMN}
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

export default Products;
