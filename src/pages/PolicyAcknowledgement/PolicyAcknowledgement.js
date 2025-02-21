import React, { useState } from "react";
import "./PolicyAcknowledgement.css";
import { FaCheck, FaArrowLeft } from "react-icons/fa";
import CapturePhoto from "../capturePhoto/capturePhoto";
import Visitor from "../visitor/visitor";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
const PolicyAcknowledgement = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showNextComponent, setShowNextComponent] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Function to show the next component
  const handleContinue = () => {
    if (isChecked) {
      setShowNextComponent(true);
    }
  };

  // If user clicks back, show ConfirmUser component
  if (goBack) {
    return <Visitor />;
  }

  // If the next component is triggered, render it instead
  if (showNextComponent) {
    return <CapturePhoto user={user} />;
  }
  if (showTerms) {
    return <TermsAndConditions user={user} />;
  }

  return (
    <div className="policy-container">
 
      {/* Back Button */}
      <div className="back-button" onClick={() => setGoBack(true)} style={{ cursor: "pointer" }}>
        <FaArrowLeft className="back-icon" /> Back
      </div>
      
      {/* Policy Content */}
      <div className="policy-content">
        <h2>Facility Usage Policies for Bellevue Community Center</h2>
        <p>
          The BELLEVUE COMMUNITY CENTER (BCC) serves as a resource providing services to a broad community. One component of our service delivery is to offer meeting and activity space to groups or individuals. Nonprofit organizations, other groups, and individuals may request the use of the facility during or outside regular operating hours. 
         </p>
        
        

        {/* Checkbox Section */}
        <div className="checkbox-section">
  <input
    type="checkbox"
    id="policy-checkbox"
    checked={isChecked}
    onChange={() => setIsChecked(!isChecked)}
  />
  <label htmlFor="policy-checkbox">
    I have read and accept  
    <span className="terms-link" onClick={() => setShowTerms(true)}>
      Terms and Conditions
    </span>
  </label>
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
