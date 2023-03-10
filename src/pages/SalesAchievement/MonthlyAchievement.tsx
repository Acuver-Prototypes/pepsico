import React from "react";
import { useMemo } from "react";
import customerGroups from "../../data/customerGroups.json";
import { useState } from "react";
import TableInstance from "../../components/Table/TableInstance";
import { FormattedMessage } from "react-intl";

const MonthlyAchievement = () => {
  const [cPageSize, cSetPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [cSortBy, cSetSortBy] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);
  const [q, setQ] = useState(null);

  // column
  const MONTHLY_ACHIEVEMENT_COLUMN = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.customerGroup"
            defaultMessage={"Customer Group"}
          />
        ),
        accessor: "customerGroup",
      },
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.w1"
            defaultMessage={"W1"}
          />
        ),
        accessor: "w1",
      },
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.w2"
            defaultMessage={"W2"}
          />
        ),
        accessor: "w2",
      },
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.w3"
            defaultMessage={"W3"}
          />
        ),
        accessor: "w3",
      },
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.w4"
            defaultMessage={"W4"}
          />
        ),
        accessor: "w4",
      },
      {
        Header: (
          <FormattedMessage
            id="monthlyAchievementTable.total"
            defaultMessage={"Total"}
          />
        ),
        accessor: "total",
      },
    ],
    []
  );

  return (
    <div className="monthly-achievement page">
      <TableInstance
        tableData={customerGroups}
        column={MONTHLY_ACHIEVEMENT_COLUMN}
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

export default MonthlyAchievement;
