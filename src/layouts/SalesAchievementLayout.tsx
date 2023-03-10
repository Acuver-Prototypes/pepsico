import React from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import TabLink from "../components/TabLink/TabLink";

const WeeklyForecast = lazy(
  () => import("../pages/SalesAchievement/WeeklyForecast")
);
const MonthlyAchievement = lazy(
  () => import("../pages/SalesAchievement/MonthlyAchievement")
);

const SalesAchievementLayout = () => {
  return (
    <div className="sales-achievement page">
      <nav className="mb-4 flex items-center justify-between">
        <ul className="flex items-center">
          <TabLink
            to={`/sales-achievement`}
            textObj={{
              defaultMessage: "Weekly Forecast",
              id: "weeklyForecast",
            }}
          />
          <TabLink
            to={`/sales-achievement/monthly-achievement`}
            textObj={{
              defaultMessage: "Monthly Achievement",
              id: "monthlyAchievement",
            }}
          />
        </ul>
      </nav>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<WeeklyForecast />} />
          <Route path="/monthly-achievement" element={<MonthlyAchievement />} />

          <Route path="*" element={<Navigate to={`/404`} replace={true} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default SalesAchievementLayout;
