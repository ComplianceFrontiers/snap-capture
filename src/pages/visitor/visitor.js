import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import ConfirmUser from "../confirmUser/confirmUser";
import "./visitor.css";

const Visitor = ({ onBack }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // Store users

  const handleContinue = async () => {
    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/signin", {
        phone: phone,
      });

      if (response.data.success) {
        setMessage("Sign-in successful!");
        setUsers(response.data.users); // Store users in state
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      console.error("API Error:", error);
    }
  };

  // If users are found, show UserSelection
  if (users.length > 0) {
    return <ConfirmUser users={users} />;
  }

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
