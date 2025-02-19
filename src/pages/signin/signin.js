import React from "react";
import "../signin/signin.css";
import { FaCheck } from "react-icons/fa";

const Signin = () => {
  return (
    <div className="container">
      <div className="button btn-sign-out">
        <FaCheck className="icon red" />
        <span>Sign In</span>
      </div>
      <div className="button btn-sign-in">
        <FaCheck className="icon green" />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default Signin;