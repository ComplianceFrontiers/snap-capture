import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Signin from "../signin/signin";
import "./UserSelection.css";

const UserSelection = () => {
  const [showSignin, setShowSignin] = useState(false);

  if (showSignin) {
    return <Signin />; // Show Signin component when "Back" is clicked
  }

  return (
    <div className="selection-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => setShowSignin(true)}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      <div className="grid-container">
        <div className="selection-box">Registered Adult</div>
        <div className="selection-box">BOTS V5 Student</div>
        <div className="selection-box" onClick={() => setShowSignin(true)}>
          Visitor
        </div>
        <div className="selection-box">BOTS IQ Student</div>
      </div>
    </div>
  );
};

export default UserSelection;
