import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import getTitle from "../../helpers/getTitle";
import Logo from "../Logos/Logo";
import LanguageSelector from "./LanguageSelector";
import Notifications from "./Notifications";
import ProfileCard from "./ProfileCard";

const Header = () => {
  const { show } = useSidebar();

  const { pathname } = useLocation();

  return (
    <header
      className={`
    header h-14 bg-white z-20 flex items-center justify-between px-4 shadow fixed top-0 right-0 ${
      show ? "left-56" : "left-20"
    }`}
    >
      <h1 className="text-3xl font-semibold noselect">
        {<FormattedMessage {...getTitle(pathname)} />}
      </h1>

      <div className="options flex items-center gap-x-3">
        <LanguageSelector />
        <Notifications />
        <ProfileCard />
      </div>
    </header>
  );
};

export default Header;
