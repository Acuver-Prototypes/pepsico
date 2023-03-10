import React from "react";
import { useMemo } from "react";
import vendors from "../../data/vendors.json";
import { useState } from "react";
import TableInstance from "../../components/Table/TableInstance";
import { useCallback } from "react";
import useToast from "../../hooks/useToast";
import TableButtons from "../../components/TableButtons/TableButtons";
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  useIntl,
} from "react-intl";
import { useNavigate } from "react-router-dom";
import DownloadBtn from "../../components/Buttons/DownloadBtn";
import UploadBtn from "../../components/Buttons/UploadBtn";

const VendorsList = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  const { showSuccess } = useToast();

  const navigate = useNavigate();

  const intl = useIntl();

  // column
  const VENDORS_COLUMN = [
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.productCode"
          defaultMessage="Product Code"
        />
      ),
      accessor: "materialNo",
    },
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.productBarcode"
          defaultMessage="Product Barcode"
        />
      ),
      accessor: "productBarcode",
    },
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.description"
          defaultMessage="Description"
        />
      ),
      accessor: "materialDescription",
    },
    {
      Header: (
        <FormattedMessage id="vendorsTable.moqType" defaultMessage="MOQ Type" />
      ),
      accessor: "moqType",
    },
    {
      Header: <FormattedMessage id="vendorsTable.moq" defaultMessage="MOQ" />,
      accessor: "moq",
    },
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.suggestedOrder"
          defaultMessage="Suggested Order"
        />
      ),
      accessor: "suggestedOrder",
    },
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.allocation/oos"
          defaultMessage="Allocation / OOS"
        />
      ),
      accessor: "allocation",
    },
    {
      Header: (
        <FormattedMessage
          id="vendorsTable.orderQty"
          defaultMessage="Order Qty"
        />
      ),
      accessor: "orderQty",
      Cell: ({ value, row }: any) => {
        const [v, setV] = useState(parseInt(value.split(" ")[0]));

        return (
          <div className="flex items-center gap-x-1">
            <input
              className="w-24 p-1 rounded border outline-none"
              type="number"
              max={parseInt(row?.original?.allocation.split(" ")[0])}
              value={v}
              onChange={(e) => {
                if (
                  parseInt(e.target.value) <
                  parseInt(row?.original?.allocation.split(" ")[0])
                ) {
                  setV(parseInt(e.target.value));
                }
              }}
            />
            CT
          </div>
        );
      },
    },
    {
      Header: (
        <FormattedMessage id="vendorsTable.weight" defaultMessage="Weight" />
      ),
      accessor: "weight",
    },
    {
      Header: (
        <FormattedMessage id="vendorsTable.volume" defaultMessage="Volume" />
      ),
      accessor: "volume",
    },
    {
      Header: (
        <FormattedMessage id="vendorsTable.pallet" defaultMessage="Pallet" />
      ),
      accessor: "pallet",
    },
  ];

  const handleSave = useCallback(() => {
    showSuccess(
      intl.formatMessage({
        id: "savedSuccessfully",
        defaultMessage: "Saved successfully",
      })
    );
  }, []);

  const handleSubmit = useCallback(() => {
    showSuccess(
      intl.formatMessage({
        id: "submittedSuccessfully",
        defaultMessage: "Submitted successfully",
      })
    );
  }, []);

  return (
    <div className="salesOrder page">
      <div className="extra-infos flex items-start justify-between">
        <div className="distributor">
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="distributorCodeFull"
                defaultMessage={"Distributor Code"}
              />
              :
            </span>
            <span className="value">201</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="shipTo" defaultMessage={"Ship To"} />:
            </span>
            <span className="value">150433935</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="allocationOOs"
                defaultMessage={"Allocation/OOS"}
              />
              :
            </span>
            <span className="value">64 CT</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="noOfProducts"
                defaultMessage={"No:of Products"}
              />
              :
            </span>
            <span className="value">30</span>
          </div>
        </div>
        <div className="noOfProducts">
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="totalOrderQty"
                defaultMessage={"Total Order Qty"}
              />
              :
            </span>
            <span className="value">1472 CT</span>
          </div>

          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="minOrderQty"
                defaultMessage={"Min Order Qty"}
              />
              :
            </span>
            <span className="value">1</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="skuType" defaultMessage={"SKU Type"} />:
            </span>
            <span className="value">CT</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="allocatedQty"
                defaultMessage={"Allocated Qty"}
              />
              :
            </span>
            <span className="value">0 CT</span>
          </div>
        </div>
        <div className="truck-info">
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="volume" defaultMessage={"Volume"} />:
            </span>
            <span className="value">0.0000</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="ctCarton" defaultMessage={"CT -Carton"} />:
            </span>
            <span className="value">1 CT</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="weight" defaultMessage={"Weight"} />:
            </span>
            <span className="value">6.425</span>
          </div>
        </div>
        <div className="distributor">
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="truckAllocated"
                defaultMessage={"Truck Allocated"}
              />
              :
            </span>
            <span className="value">10W13P</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="capacityOfTruck"
                defaultMessage={"Capacity Of Truck"}
              />
              :
            </span>
            <span className="value">15000</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="capacityUtilized"
                defaultMessage={"Capacity Utilized"}
              />
              :
            </span>
            <span className="value">13</span>
          </div>
          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage id="orderDate" defaultMessage={"Order Date"} />:
            </span>
            <span className="value">
              <FormattedDate
                value={new Date()}
                day="2-digit"
                month="2-digit"
                year="2-digit"
              />
            </span>
          </div>

          <div className="flex gap-x-2 mb-2">
            <span className="text font-bold">
              <FormattedMessage
                id="deliveryDate"
                defaultMessage={"Delivery Date"}
              />
              :
            </span>
            <span className="value">
              <FormattedDate
                value={new Date().setDate(new Date().getDate() + 5)}
                day="2-digit"
                month="2-digit"
                year="2-digit"
              />
            </span>
          </div>
        </div>
      </div>

      <TableButtons>
        <DownloadBtn />
        <UploadBtn />

        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/salesOrder/addProduct");
          }}
        >
          <FormattedMessage id="addOrder" defaultMessage={"Add Order"} />
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <FormattedMessage id="save" defaultMessage="Save" />
        </button>
        <button className="btn bg-green-500" onClick={handleSubmit}>
          <FormattedMessage id="submit" defaultMessage="Submit" />
        </button>
      </TableButtons>

      <TableInstance
        tableData={vendors}
        column={VENDORS_COLUMN}
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

export default VendorsList;
