import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./visitor.css";

const Visitor = ({ onBack }) => {
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    console.log("Phone Number:", phone);
    // Perform further actions (e.g., API call)
  };

  return (
    <div className="visitor-container">
      {/* Back Button */}
      <div className="back-button" onClick={onBack}>
        <FaArrowLeft className="back-icon" /> Back
      </div>

      {/* Phone Number Field */}
      <div className="phone-input-container">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Continue Button */}
      <div className="button-container">
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Visitor;
