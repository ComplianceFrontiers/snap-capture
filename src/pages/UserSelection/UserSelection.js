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

      <div className="grid-container">
        <div className="selection-box">Registered Adult</div>
        <div className="selection-box">BOTS V5 Student</div>
        <div className="selection-box" onClick={() => setActiveComponent("visitor")}>
          Visitor
        </div>
        <div className="selection-box">BOTS IQ Student</div>
      </div>
    </div>
  );
};

export default UserSelection;
