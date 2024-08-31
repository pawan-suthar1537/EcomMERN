// import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

// function CheckAuth({ isauth, user, children }) {
//   console.log("CheckAuth component rendered", { isauth, user });
//   const location = useLocation();

//   console.log("isauth", isauth);
//   console.log("user", user);

//   // Redirect unauthenticated users to login
//   if (!isauth || !user) {
//     return <Navigate to="/auth/login" state={{ from: location }} />;
//   }

//   // Redirect authenticated users away from login/register pages
//   if (
//     (location.pathname.includes("/auth/login") ||
//       location.pathname.includes("/auth/register")) &&
//     isauth
//   ) {
//     return user.role === "admin" ? (
//       <Navigate to="/admin/dashboard" />
//     ) : (
//       <Navigate to="/shop/home" />
//     );
//   }

//   // Restrict admin routes to admin users only
//   if (
//     isauth &&
//     user.role !== "admin" &&
//     location.pathname.startsWith("/admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   // Restrict shopping routes to non-admin users
//   if (
//     isauth &&
//     user.role === "admin" &&
//     location.pathname.startsWith("/shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

// CheckAuth.propTypes = {
//   isauth: PropTypes.bool,
//   user: PropTypes.shape({
//     role: PropTypes.string,
//   }),
//   children: PropTypes.node,
// };

// export default CheckAuth;
