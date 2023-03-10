import React from "react";
import { FiSearch } from "react-icons/fi";
import { useIntl } from "react-intl";

const GlobalFilter = ({ filter, setFilter }: any) => {
  const intl = useIntl();

  return (
    <div className="search w-full px-2 py-2 rounded-t bg-white border-b flex items-center justify-between sticky top-14">
      <div className="search-box flex items-center gap-x-2 border w-80 rounded p-2">
        <FiSearch size={16} className="text-gray-700" />
        <input
          type="text"
          value={filter || ""}
          className="outline-none bg-none"
          onChange={(e) => setFilter(e.target.value)}
          placeholder={intl.formatMessage({
            id: "search",
            defaultMessage: "Search",
          })}
        />
      </div>

      <div
        id="table-buttons-portal"
        className="flex items-center gap-x-2"
      ></div>
    </div>
  );
};

export default GlobalFilter;
