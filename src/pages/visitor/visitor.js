import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios"; // Import axios for API requests
import "./visitor.css";

const Visitor = ({ onBack }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleContinue = async () => {
    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/signin", {
        phone: phone
      });

      if (response.data.success) {
        setMessage("Sign-in successful!");
        console.log("User Data:", response.data.users);
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      console.error("API Error:", error);
    }
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

      {/* Error / Success Message */}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

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
