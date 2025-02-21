import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Signin from "../signin/signin";
import Visitor from "../visitor/visitor";
import "./UserSelection.css";

const UserSelection = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleBack = () => setActiveComponent(null);

  if (activeComponent === "signin") {
    return <Signin />;
  }

  if (activeComponent === "visitor") {
    return <Visitor onBack={handleBack} />;
  }

  return (
    <div className="selection-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => setActiveComponent("signin")}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      <div className="grid-container" style={{
    display: "grid"
  }}>
        <div className="selection-box1" onClick={() => setActiveComponent("visitor")}>Chess Club</div>
        <div className="selection-box1">Chess Tournament</div>
        <div className="selection-box1">
         Chess Coaching
        </div>
        <div className="selection-box1">Chess Champs</div>
      </div>
    </div>
  );
};

export default UserSelection;
