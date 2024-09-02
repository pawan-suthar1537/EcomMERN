import CommonForm from "@/components/common/form";
import { API_URL, loginformcontrols } from "@/config";
import { setToken, setUser } from "@/store/authslice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialstate = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formdata, setformdata] = useState(initialstate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onsubmit = async (event) => {
    event.preventDefault();
    console.log("formdata", formdata);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formdata, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("res while login", res.data);

      if (res.data.success === false) {
        toast.error("Error logging in user");
        throw new Error(res.data.message);
      }

      toast.success(
        res.data.message ||
          `${
            res.data.user.role === "admin" ? "Admin" : "User"
          } logged in successfully`
      );
      console.log("res.data.user", res.data.user);
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Error logging in user");
    }
  };

  // useEffect(() => {
  //   if (isauth && user) {
  //     if (user.role === "admin") {
  //       if (
  //         location.pathname === "/auth/login" ||
  //         location.pathname === "/auth/register"
  //       ) {
  //         navigate("/admin/dashboard");
  //       }
  //     } else if (user.role === "user") {
  //       if (
  //         location.pathname === "/auth/login" ||
  //         location.pathname === "/auth/register"
  //       ) {
  //         navigate("/shop/home");
  //       }
  //     }
  //   }
  // }, [isauth, user, navigate, location.pathname]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Login into your Account
        </h1>
        <p className="mt-2 ">
          Dont Have an Account?
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to={"/auth/register"}
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formcontrols={loginformcontrols}
        buttontext={"Sign up"}
        formdata={formdata}
        setformdata={setformdata}
        onsubmit={onsubmit}
      />
    </div>
  );
};

export default AuthLogin;
