import React from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSidebar } from "../contexts/SidebarContext";

const DailyAllocation = lazy(() => import("../pages/DailyAllocation"));
const StocksAvailable = lazy(() => import("../pages/StocksAvailable"));
const SalesAchievementLayout = lazy(() => import("./SalesAchievementLayout"));
const Forecast = lazy(() => import("../pages/Forecast"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const AddProduct = lazy(() => import("../pages/Products/AddProduct"));
const Distributors = lazy(() => import("../pages/Distributors/Distributors"));
const AddDistributor = lazy(
  () => import("../pages/Distributors/AddDistributor")
);
const DistributorDetails = lazy(
  () => import("../pages/Distributors/DistributorDetails")
);
const ProductMapping = lazy(
  () => import("../pages/ProductMapping/ProductMapping")
);
const AddProductMapping = lazy(
  () => import("../pages/ProductMapping/AddProductMapping")
);
const ProductMappingDetails = lazy(
  () => import("../pages/ProductMapping/ProductMappingDetails")
);
const AllocationRules = lazy(() => import("../pages/AllocationRules"));
const VendorsList = lazy(() => import("../pages/VendorList/VendorsList"));
const AddOrder = lazy(() => import("../pages/VendorList/AddOrder"));
const OrderHistory = lazy(() => import("../pages/OrderHistory"));
const NotFound = lazy(() => import("../pages/NotFound"));

const UserLayout = () => {
  const { show } = useSidebar();

  return (
    <div
      className="layout relative flex flex-col w-full"
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        className={`main flex-1 w-full flex flex-col ${
          show ? "pl-56" : "pl-20"
        }`}
      >
        <Header />

        <div className="page-wrapper w-full flex-1 flex flex-col pt-14">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<DailyAllocation />} />
              <Route path="/stocks-available" element={<StocksAvailable />} />
              <Route
                path="/sales-achievement/*"
                element={<SalesAchievementLayout />}
              />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/products">
                <Route index element={<Products />} />
                <Route path="create" element={<AddProduct />} />
                <Route path=":id" element={<ProductDetails />} />
              </Route>
              <Route path="/distributors">
                <Route index element={<Distributors />} />
                <Route path="create" element={<AddDistributor />} />
                <Route path=":id" element={<DistributorDetails />} />
              </Route>

              <Route path="/product-mapping">
                <Route index element={<ProductMapping />} />
                <Route path="create" element={<AddProductMapping />} />
                <Route path=":id" element={<ProductMappingDetails />} />
              </Route>

              <Route path="/allocation-rules" element={<AllocationRules />} />
              <Route path="/salesOrder">
                <Route index element={<VendorsList />} />
                <Route path="addProduct" element={<AddOrder />} />
              </Route>
              <Route path="/order-history" element={<OrderHistory />} />

              <Route path="404" element={<NotFound />} />

              <Route
                path="*"
                element={<Navigate to={`/404`} replace={true} />}
              />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
