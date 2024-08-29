import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isauth, user, children }) {
  const location = useLocation();

  if (
    !isauth &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isauth &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/shop/home" />;
  }

  if (isauth && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  if (isauth && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

CheckAuth.propTypes = {
  isauth: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string
  }),
  children: PropTypes.node.isRequired
};

export default CheckAuth;
