import CommonForm from "@/components/common/form";
import { API_URL, registerformcontrols } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialstate = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formdata, setformdata] = useState(initialstate);
  const { isauth, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
 
  const location = useLocation();

  const onsubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formdata, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (res.data.success === false) {
        toast.error(res.data.message || "Error registering user");
        throw new Error(res.data.message);
      }
      toast.success(res.data.message || "User registered successfully");

      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message || "Error registering user");
    }
  };

  useEffect(() => {
    if (isauth && user) {
      if (user.role === "admin") {
        if (
          location.pathname === "/auth/login" ||
          location.pathname === "/auth/register"
        ) {
          navigate("/admin/dashboard");
        }
      } else if (user.role === "user") {
        if (
          location.pathname === "/auth/login" ||
          location.pathname === "/auth/register"
        ) {
          navigate("/shop/home");
        }
      }
    }
  }, [isauth, user, navigate, location.pathname]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Create New Account
        </h1>
        <p className="mt-2 ">
          Already Have an Account?
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formcontrols={registerformcontrols}
        buttontext={"Sign up"}
        formdata={formdata}
        setformdata={setformdata}
        onsubmit={onsubmit}
      />
    </div>
  );
};

export default AuthRegister;
