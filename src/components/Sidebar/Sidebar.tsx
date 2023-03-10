import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import Logo from "../Logos/Logo";
import LogoSmall from "../Logos/LogoSmall";
import SidebarItem from "./SidebarItem";
import {
  FiArchive,
  FiBarChart,
  FiChevronsLeft,
  FiChevronsRight,
  FiDatabase,
  FiDivideSquare,
  FiLayers,
  FiPieChart,
  FiSettings,
  FiShoppingBag,
  FiToggleRight,
  FiTrendingUp,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

const Sidebar = () => {
  const { show, setShow } = useSidebar();

  return (
    <aside
      className={`sidebar bg-sidebar fixed shadow-xl left-0 top-0 bottom-0  ${
        show ? "w-56" : "w-20"
      } flex flex-col z-30`}
    >
      <Link
        to={`/`}
        className="flex items-center justify-center w-full logo px-4 py-2 mt-1 mb-6 h-14"
      >
        {show ? <Logo /> : <LogoSmall />}
      </Link>

      <button
        aria-label="sidebar-toggle-btn"
        className="absolute -right-3 top-14 toggle-btn flex items-center justify-center text-baseBlack bg-white shadow-lg p-1 rounded-full z-30"
        onClick={() => setShow((prevValue) => !prevValue)}
      >
        {show ? <FiChevronsLeft size={18} /> : <FiChevronsRight size={18} />}
      </button>

      <ul className="invisible-scrollbar flex-1 overflow-y-auto w-full flex flex-col px-2 gap-y-2">
        <SidebarItem
          translateId="dailyAllocation"
          to="/"
          text="Daily Allocation"
          shortText="Daily Allocation"
          Icon={FiBarChart}
        />
        <SidebarItem
          translateId="stocksAvailable"
          to="/stocks-available"
          text="Stocks Available"
          shortText="Stocks Available"
          Icon={FiArchive}
        />
        <SidebarItem
          translateId="salesAchievement"
          to="/sales-achievement"
          text="Sales Achievement"
          shortText="Sales Achievement"
          Icon={FiPieChart}
        />
        <SidebarItem
          translateId="forecast"
          to="/forecast"
          text="Forecast"
          shortText="Forecast"
          Icon={FiTrendingUp}
        />
        <SidebarItem
          translateId="products"
          to="/products"
          text="Products"
          shortText="Products"
          Icon={FiShoppingBag}
        />
        <SidebarItem
          translateId="product-mapping"
          to="/product-mapping"
          text="Product Mapping"
          shortText="Product Mapping"
          Icon={FiLayers}
        />
        <SidebarItem
          translateId="distributors"
          to="/distributors"
          text="Distributors"
          shortText="Distributors"
          Icon={FiTruck}
        />
        <SidebarItem
          translateId="allocationRules"
          to="/allocation-rules"
          text="Allocation Rules"
          shortText="Allocation Rules"
          Icon={FiToggleRight}
        />
        <SidebarItem
          translateId="salesOrder"
          to="/salesOrder"
          text="Sales Order"
          shortText="Sales Order"
          Icon={FiUsers}
        />
        <SidebarItem
          translateId="orderHistory"
          to="/order-history"
          text="Order History"
          shortText="Order History"
          Icon={FiDatabase}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
