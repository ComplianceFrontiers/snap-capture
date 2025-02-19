import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
 import Visitor from "../visitor/visitor"; // Import UserSelection component

import "./UserSelection.css";

const UserSelection = () => {
  const [showVisitor, setShowVisitor] = useState(false);

  if (showVisitor) {
    return <Visitor onBack={() => setShowVisitor(false)} />;
  }

  return (
    <div className="selection-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => window.history.back()}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      <div className="grid-container">
        <div className="selection-box">Registered Adult</div>
        <div className="selection-box">BOTS V5 Student</div>
        <div className="selection-box" onClick={() => setShowVisitor(true)}>
          Visitor
        </div>
        <div className="selection-box">BOTS IQ Student</div>
      </div>
    </div>
  );
};

export default UserSelection;
