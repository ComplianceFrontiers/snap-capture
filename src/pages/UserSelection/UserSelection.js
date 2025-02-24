import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Signin from "../signin/signin";
import Visitor from "../visitor/visitor";
import "./UserSelection.css";
import image1 from "../../images/2.png"; // Chess Club
import image2 from "../../images/3.png"; // Chess Tournament
import image3 from "../../images/4.png"; // Chess Coaching
import image4 from "../../images/5.png"; // Chess Champs

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
        {/* Chess Club */}
        <div className="selection-box1" onClick={() => setActiveComponent("visitor")}>
          <img src={image1} alt="Chess Club" className="selection-image" />
        </div>

        {/* Blocked Chess Tournament */}
        <div className="selection-box1 disabled">
          <img src={image2} alt="Chess Tournament" className="selection-image disabled-image" />
        </div>

        {/* Blocked Chess Coaching */}
        <div className="selection-box1 disabled">
          <img src={image3} alt="Chess Coaching" className="selection-image disabled-image" />
        </div>

        {/* Redirect to Chess Champs website */}
        <div className="selection-box1" onClick={handleChessChampsClick}>
          <img src={image4} alt="Chess Champs" className="selection-image" />
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
