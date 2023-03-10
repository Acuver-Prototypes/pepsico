import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import useOutSideClose from "../../hooks/useOutSideClose";

const Notifications = () => {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useOutSideClose(() => setShowOptions(false));

  return (
    <div
      className="notifications relative flex items-center justify-center text-sm"
      ref={ref}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`${
          showOptions ? "active" : ""
        } text-primary_black icon-button`}
      >
        <FiBell size={20} />
      </button>

      {showOptions && (
        <div
          className="absolute -right-2 z-40 bg-white rounded-xl shadow-lg top-10"
          style={{
            minWidth: "200px",
          }}
        >
          <ul className="flex flex-col font-base">
            <li className="rounded-t-xl cursor-pointer px-4 py-2 hover:bg-blue-200">
              <FormattedMessage
                id="notification"
                defaultMessage="Notification"
              />{" "}
              1
            </li>

            <li className="rounded-b-xl cursor-pointer px-4 py-2 hover:bg-blue-200">
              <FormattedMessage
                id="notification"
                defaultMessage="Notification"
              />{" "}
              2
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
