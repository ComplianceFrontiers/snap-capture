import React, { useState } from "react";
import "../signin/signin.css";
import { FaCheck } from "react-icons/fa";
import UserSelection from "../UserSelection/UserSelection"; // Import UserSelection component
import SignOutContainer from "../signout/signout";

const Signin = () => {
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSignInClick = () => {
    setShowUserSelection(true);
    setShowSignOut(false);
  };

  const handleSignOutClick = () => {
    setShowSignOut(true);
    setShowUserSelection(false);
  };

  return (
    <div className="container">
      {!showUserSelection && !showSignOut ? (
        <>
          <div className="btn-sign-in" onClick={handleSignInClick}>
            <FaCheck className="icon green" />
            <span>Sign In</span>
          </div>
          <div className="button btn-sign-out" onClick={handleSignOutClick}>
            <FaCheck className="icon red" />
            <span>Sign Out</span>
          </div>
        </>
      ) : showUserSelection ? (
        <UserSelection />
      ) : (
        <SignOutContainer />
      )}
    </div>
  );
};

export default Signin;
