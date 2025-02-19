import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import ConfirmUser from "../confirmUser/confirmUser";
import "./visitor.css";

const Visitor = ({ onBack }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // Store matching users
  const [suggestions, setSuggestions] = useState([]); // Store phone suggestions
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (phone.length >= 3) {
      fetchSuggestions(phone);
    } else {
      setSuggestions([]); // Clear suggestions when input is short
    }
  }, [phone]);

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/signin", {
        phone: query,
      });

      if (response.data.success) {
        setSuggestions(response.data.users);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (selectedPhone) => {
    setPhone(selectedPhone); // Autofill input field
    setSuggestions([]); // Hide suggestions after selection
  };

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

  // If users are found, show ConfirmUser component
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
        {loading && <p className="loading-text">Searching...</p>}

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((user) => (
              <li key={user.user_id} onClick={() => handleSelectSuggestion(user.phone)}>
                {user.phone} - {user.first_name} {user.last_name}
              </li>
            ))}
          </ul>
        )}
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
