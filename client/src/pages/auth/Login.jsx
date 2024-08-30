import CommonForm from "@/components/common/form";
import { loginformcontrols } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialstate = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formdata, setformdata] = useState(initialstate);

  const onsubmit = (event) => {
    event.preventDefault();
    console.log(formdata);
  };
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
