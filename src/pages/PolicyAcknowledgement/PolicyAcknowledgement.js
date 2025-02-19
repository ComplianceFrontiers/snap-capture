import React, { useState } from "react"; 
import "./PolicyAcknowledgement.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import CapturePhoto from "../capturePhoto/capturePhoto";

const PolicyAcknowledgement = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showNextComponent, setShowNextComponent] = useState(false);

  // Function to show the next component
  const handleContinue = () => {
    if (isChecked) {
      setShowNextComponent(true);
    }
  };

  // If the next component is triggered, render it instead
  if (showNextComponent) {
    return <CapturePhoto />;
  }

  return (
    <div className="policy-container">
      {/* Back Button */}
      <div className="back-button">
        <IoIosArrowBack size={24} />
      </div>

      {/* Policy Content */}
      <div className="policy-content">
        <h2>Policy Acknowledgement</h2>
        <p>
          By attending and/or participating in any BrandywineBOTS event, I
          acknowledge that I will fully abide by the BrandywineBOTS Code of
          Conduct, the BrandywineBOTS Student & Parent Handbook, the
          REC/FA/EX Code of Conduct, and the Student Generated Policy. <br />
          (Copies of all referenced policies can be found at{" "}
          <a href="https://www.BrandywineBOTS.org/handbook" target="_blank" rel="noopener noreferrer">
            www.BrandywineBOTS.org/handbook
          </a>
          )
        </p>

        {/* Checkbox Section */}
        <div className="checkbox-section">
          <input
            type="checkbox"
            id="policy-checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="policy-checkbox">I have read and understood the above.</label>
        </div>

        {/* Buttons */}
        <div className="button-container1">
          <button
            className={`confirm-button1 ${isChecked ? "enabled" : "disabled"}`}
            disabled={!isChecked}
            onClick={handleContinue} // Call handleContinue on click
          >
            <FaCheck /> Continue
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PolicyAcknowledgement;
