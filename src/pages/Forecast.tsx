import React from "react";
import { useMemo } from "react";
import { stripText } from "../utils";
import forecast from "../data/forecast.json";
import { useState } from "react";
import TableInstance from "../components/Table/TableInstance";
import { FormattedMessage } from "react-intl";
import TableButtons from "../components/TableButtons/TableButtons";
import DownloadBtn from "../components/Buttons/DownloadBtn";
import UploadBtn from "../components/Buttons/UploadBtn";

const Forecast = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  // column
  const FORECAST_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="forecastTable.channel"
            defaultMessage={"Channel"}
          />
        ),
        accessor: "channel",
      },
      {
        Header: (
          <FormattedMessage
            id="forecastTable.productId"
            defaultMessage={"Product ID"}
          />
        ),
        accessor: "productID",
      },
      {
        Header: (
          <FormattedMessage
            id="forecastTable.subChannel"
            defaultMessage={"Sub Channel"}
          />
        ),
        accessor: "subChannel",
      },
      {
        Header: (
          <FormattedMessage
            id="forecastTable.keyFigure"
            defaultMessage={"Key Figure"}
          />
        ),
        accessor: "keyFigure",
      },
      {
        Header: "w18 2022 - (5/2/2022 - 5/8/2022)",
        accessor: "w18",
      },
      {
        Header: "w19 2022 - (5/9/2022 - 5/15/2022)",
        accessor: "w19",
      },
      {
        Header: "w20 2022 - (5/16/2022 - 5/22/2022)",
        accessor: "w20",
      },
      {
        Header: "w21 2022 - (5/23/2022 - 5/29/2022)",
        accessor: "w21",
      },
      {
        Header: "w22 2022 - (5/30/2022 - 6/5/2022)",
        accessor: "w22",
      },
    ],
    []
  );

  return (
    <div className="forecast page">
      <TableButtons>
        <DownloadBtn />
        <UploadBtn />
      </TableButtons>

      <TableInstance
        tableData={forecast}
        column={FORECAST_COLUMN}
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

export default Forecast;
