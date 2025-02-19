import React, { useState } from "react";
import "../PolicyAcknowledgement/PolicyAcknowledgement.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const PolicyAcknowledgement = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="policy-container">
      {/* Back Button */}
      <div className="back-button">
        <IoArrowBack size={24} />
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
        <div className="button-container">
          <button className={`confirm-button ${isChecked ? "enabled" : "disabled"}`} disabled={!isChecked}>
            <FaCheck /> Continue
          </button>
          <button className="cancel-button">
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyAcknowledgement;
