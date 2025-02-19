import React from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing back arrow icon
import "../UserSelection/UserSelection.css"; // Import SCSS file

const UserSelection = () => {
  return (
    <div className="selection-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => window.history.back()}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      <div className="grid-container">
        <div className="selection-box">Registered Adult</div>
        <div className="selection-box">BOTS V5 Student</div>
        <div className="selection-box">Visitor</div>
        <div className="selection-box">BOTS IQ Student</div>
      </div>
    </div>
  );
};

export default UserSelection;
