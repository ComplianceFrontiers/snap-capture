import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import ConfirmUser from "../confirmUser/confirmUser";
import Signup from "../signup/signup.js";
import "./visitor.css";

const Visitor = ({ onBack }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // Store matching users
  const [suggestions, setSuggestions] = useState([]); // Store phone suggestions
  const [loading, setLoading] = useState(false);
  const [showSignInMessage, setShowSignInMessage] = useState(false);
  const [showSignInComponent, setShowSignInComponent] = useState(false); // State to control SignInComponent visibility

  useEffect(() => {
    if (phone.length >= 3) {
      fetchSuggestions(phone);
    } else {
      setSuggestions([]); // Clear suggestions when input is short
      setShowSignInMessage(false);
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
        setShowSignInMessage(false);
      } else {
        setSuggestions([]);
        setShowSignInMessage(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSuggestions([]);
        setShowSignInMessage(true); // Show "Please sign in" message
      } else {
        console.error("Error fetching suggestions:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (selectedUser) => {
    setUsers([selectedUser]); // Store the selected user in state
  };

  const handleSignInClick = () => {
    setShowSignInComponent(true); // Show the SignInComponent when "Please sign in" is clicked
  };

  // If users are found, show ConfirmUser component
  if (users.length > 0) {
    return <ConfirmUser users={users} />;
  }

  // If user clicks "Please sign in," show SignInComponent
  if (showSignInComponent) {
    return <Signup />;
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
        {suggestions.length > 0 ? (
          <div className="suggestions-container">
            {suggestions.map((user) => (
              <div
                key={user.user_id}
                className="suggestion-box"
                onClick={() => handleSelectSuggestion(user)}
              >
                {user.player_first} {user.player_last}
              </div>
            ))}
          </div>
        ) : showSignInMessage ? (
          <div className="signin-message">
          <span>Could not locate your phone number. Please </span>
          <button className="register-button" onClick={handleSignInClick}>Register</button>
        </div>
        

        ) : null}
      </div>

      {/* Error / Success Message */}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Visitor;
