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
        <div className="selection-box1">Registered Adult</div>
        <div className="selection-box1">BOTS V5 Student</div>
        <div className="selection-box1" onClick={() => setActiveComponent("visitor")}>
          Visitor
        </div>
        <div className="selection-box1">BOTS IQ Student</div>
      </div>
    </div>
  );
};

export default UserSelection;
