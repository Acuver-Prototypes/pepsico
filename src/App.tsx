import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Login = lazy(() => import("./pages/auth/Login"));

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="auth/login" element={<Login />} />

          {/* /* */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
