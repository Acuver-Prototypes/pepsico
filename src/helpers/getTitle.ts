import { TranslateObj } from "../types";

const getTitle = (path: string): TranslateObj => {
  if (path === "/") {
    return {
      defaultMessage: "Daily Allocation",
      id: "dailyAllocation",
    };
  } else if (path === "/stocks-available") {
    return {
      defaultMessage: "Stocks Available",
      id: "stocksAvailable",
    };
  } else if (
    path === "/sales-achievement" ||
    path === "/sales-achievement/monthly-achievement"
  ) {
    return {
      defaultMessage: "Sales Achievement",
      id: "salesAchievement",
    };
  } else if (path === "/forecast") {
    return {
      defaultMessage: "Forecast",
      id: "forecast",
    };
  } else if (path.includes("/products")) {
    return {
      defaultMessage: "Products",
      id: "products",
    };
  } else if (path.includes("/distributors")) {
    return {
      defaultMessage: "Distributors",
      id: "distributors",
    };
  } else if (path === "/allocation-rules") {
    return {
      defaultMessage: "Allocation Rules",
      id: "allocationRules",
    };
  } else if (path.includes("/salesOrder")) {
    return {
      defaultMessage: "Sales Order",
      id: "salesOrder",
    };
  } else if (path.includes("/product-mapping")) {
    return {
      defaultMessage: "Product Mapping",
      id: "productMapping",
    };
  } else if (path === "/order-history") {
    return {
      defaultMessage: "Order History",
      id: "orderHistory",
    };
  } else {
    return {
      defaultMessage: "",
      id: "",
    };
  }
};

export default getTitle;
