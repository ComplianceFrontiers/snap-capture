import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Signin from "../signin/signin";
import Visitor from "../visitor/visitor";
import "./UserSelection.css";

const UserSelection = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  if (activeComponent === "signin") {
    return <Signin />;
  }

  if (activeComponent === "visitor") {
    return <Visitor />;
  }

  const handleChessChampsClick = () => {
    window.location.href = "https://www.chesschamps.us/";
  };

  return (
    <div className="selection-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => setActiveComponent("signin")}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      <div className="grid-container">
        <div className="selection-box1" onClick={() => setActiveComponent("visitor")}>
          Chess Club
        </div>

        {/* Blocked Chess Tournament */}
        <div className="selection-box1 disabled">Chess Tournament</div>

        {/* Blocked Chess Coaching */}
        <div className="selection-box1 disabled">Chess Coaching</div>

        {/* Redirect to Chess Champs website */}
        <div className="selection-box1" onClick={handleChessChampsClick}>
          Chess Champs
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
