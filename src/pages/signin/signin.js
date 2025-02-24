import React, { useState } from "react";
import "../signin/signin.css";
import UserSelection from "../UserSelection/UserSelection"; 
import SignOutContainer from "../signout/signout";
import image1 from "../../images/7.png"; // Sign In
import image2 from "../../images/8.png"; // Sign Out
import welcomeVideo from "../../video/welcomevideo.mp4";

const Signin = () => {
  const [showSignOptions, setShowSignOptions] = useState(false);
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const handleVideoClick = () => {
    setShowSignOptions(true);
  };

  const handleSignInClick = () => {
    setShowUserSelection(true);
    setShowSignOut(false);
  };

  const handleSignOutClick = () => {
    setShowSignOut(true);
    setShowUserSelection(false);
  };

  return (
    <div className={`container ${!showSignOptions ? "video-bg" : ""}`}>
      {!showSignOptions ? (
        <div className="video-container" onClick={handleVideoClick}>
          <video autoPlay muted loop>
            <source src={welcomeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : !showUserSelection && !showSignOut ? (
        <>
          <div className="sign-button" onClick={handleSignInClick}>
            <img src={image1} alt="Sign In" className="sign-image" />
          </div>

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
