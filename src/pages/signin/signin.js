import React, { useState } from "react";
import "../signin/signin.css";
import UserSelection from "../UserSelection/UserSelection"; // Import UserSelection component
import SignOutContainer from "../signout/signout";
import image1 from "../../images/7.png"; // Sign In
import image2 from "../../images/8.png"; // Sign Out
import video from "../../video/welcomevideo.mp4";
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
          {/* Sign In Button with Image */}
          <div className="sign-button" onClick={handleSignInClick}>
            <img src={image1} alt="Sign In" className="sign-image" />
          </div>

          {/* Sign Out Button with Image */}
          <div className="sign-button" onClick={handleSignOutClick}>
            <img src={image2} alt="Sign Out" className="sign-image" />
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
