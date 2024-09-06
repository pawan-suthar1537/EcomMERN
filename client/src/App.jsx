import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";

import ShoppingLayout from "./components/shopping-view/Layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/productlisting";
import ShoppingHome from "./pages/shopping-view/home";

import Unauthpage from "./pages/unauthpage/unauthpage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ShoppingOrders from "./components/shopping-view/order";

import AdminOrder from "./pages/admin-view/orders";

function App() {
  const navigate = useNavigate();
  const { isauth, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isauth === false || user === null) {
      navigate("/auth/login");
    }
  }, []);

  const redirectTo = (path) => {
    if (isauth && user) {
      return user.role === "admin" ? "/admin/dashboard" : "/shop/home";
    }
    return path;
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ShoppingLayout />}>
            <Route index element={<ShoppingHome />} />
            <Route path="shop/home" element={<ShoppingHome />} />
            <Route path="shop/products" element={<ShoppingListing />} />
            <Route path="shop/checkout" element={<ShoppingCheckout />} />
            <Route path="shop/orders" element={<ShoppingOrders />} />
            <Route
              path="shop/account"
              element={
                isauth ? <ShoppingAccount /> : <Navigate to="/auth/login" />
              }
            />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route
              path="login"
              element={
                isauth ? (
                  <Navigate to={redirectTo("/auth/login")} />
                ) : (
                  <AuthLogin />
                )
              }
            />
            <Route
              path="register"
              element={
                isauth ? (
                  <Navigate to={redirectTo("/auth/register")} />
                ) : (
                  <AuthRegister />
                )
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              isauth && user?.role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/unauth-page" />
              )
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrder />} />
          </Route>

          <Route path="unauth-page" element={<Unauthpage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
