import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminOrders from "./pages/admin-view/Orders";

import ShoppingLayout from "./components/shopping-view/Layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/productlisting";
import ShoppingHome from "./pages/shopping-view/home";
import CheckAuth from "./components/common/checkauth";
import Unauthpage from "./pages/unauthpage/unauthpage";

function App() {
  const isauth = false;
  const user = null;

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route
            path="/auth"
            element={
              <CheckAuth isauth={isauth} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isauth={isauth} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isauth={isauth} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="product-listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<Unauthpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
