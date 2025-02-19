import React, { useState } from "react";
import "../signin/signin.css";
import { FaCheck } from "react-icons/fa";
import UserSelection from "../UserSelection/UserSelection"; // Import UserSelection component

const Signin = () => {
  const [showUserSelection, setShowUserSelection] = useState(false);

  const handleSignInClick = () => {
    setShowUserSelection(true); // Show UserSelection when clicking Sign In
  };

  return (
    <div className="container">
      {!showUserSelection ? (
        <>
          <div className="button btn-sign-in" onClick={handleSignInClick}>
            <FaCheck className="icon green" />
            <span>Sign In</span>
          </div>
          <div className="button btn-sign-out">
            <FaCheck className="icon red" />
            <span>Sign Out</span>
          </div>
        </>
      ) : (
        <UserSelection />
      )}
    </div>
  );
};

export default Signin;
