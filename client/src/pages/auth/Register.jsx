import CommonForm from "@/components/common/form";
import { registerformcontrols } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialstate = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formdata, setformdata] = useState(initialstate);

  const onsubmit = (event) => {
    event.preventDefault();
    console.log(formdata);
  };

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
