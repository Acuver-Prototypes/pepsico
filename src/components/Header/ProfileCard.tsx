import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { FormattedMessage } from "react-intl";
import useAuth from "../../hooks/useAuth";
import useOutSideClose from "../../hooks/useOutSideClose";

const ProfileCard = () => {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useOutSideClose(() => setShowOptions(false));

  const { user, logoutUser } = useAuth();

  return (
    <div
      className="profile-card noselect flex items-center justify-center relative"
      ref={ref}
    >
      <button
        className={`${
          showOptions ? "active" : ""
        } text-baseBlack icon-button rounded-full`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <img
          className="object-contain rounded-full w-7 h-7"
          src={require("../../assets/images/default.jpg")}
          alt="profile"
        />
      </button>

      {showOptions && (
        <div
          className="absolute -right-2 z-40 bg-white rounded-xl shadow-lg top-12"
          style={{
            minWidth: "200px",
          }}
        >
          <ul className="flex flex-col">
            <li className="rounded-t-xl text-sm font-medium px-4 py-3 border-b">
              <h3>{user?.username}</h3>
              <span className="text-sm font-light text-gray-500">
                {user?.email}
              </span>
            </li>

            <li className="rounded-b-xl text-sm font-medium cursor-pointer hover:bg-gray-200">
              <button
                onClick={() => logoutUser()}
                className="flex items-center gap-x-3 px-4 py-3  w-full h-full"
              >
                <IoLogOutOutline size={16} />
                <span>
                  <FormattedMessage id="logout" defaultMessage={"Logout"} />
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;