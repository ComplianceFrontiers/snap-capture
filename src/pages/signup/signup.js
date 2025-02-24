import React, { useState } from "react";
import "./signup.css";
import Visitor from "../visitor/visitor.js";
import axios from "axios";

const Signup = ({ onBack }) => {
  const [formData, setFormData] = useState({
    player_first: "",
    player_last: "",
    phone: "",
    email: "",
    last_signin: new Date().toISOString(), // Current timestamp
  });

  const [message, setMessage] = useState(""); // For success/error messages
  const [showVisitor, setShowVisitor] = useState(false);

  if (showVisitor) {
    return <Visitor />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
  
    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/signup", formData);
      setMessage(response.data.message);
  
      // Redirect to Stripe payment page after successful signup
      window.location.href = "https://buy.stripe.com/00gg2DboddF50DudQQ";
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed. Try again.");
    }
  };
  

  return (
    <div className="container6">
      <div className="back-button" onClick={() => setShowVisitor(true)}>
        <span className="back-icon">←</span> Back
      </div>
      <h2 className="form-heading">Sign Up</h2>
      {message && <p className="message">{message}</p>}
      
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Player Name */}
        <h3>Player Name <span class="red-star">*</span></h3>

        <input
          type="text"
          name="player_first"
          placeholder="First Name"
          value={formData.player_first}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="player_last"
          placeholder="Last Name"
          value={formData.player_last}
          onChange={handleChange}
          required
        />

        {/* Parent Name (Optional) */}
        <h3>Parent Name (for minors)</h3>
        <input
          type="text"
          name="parent_first"
          placeholder="First Name"
          value={formData.parent_first}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parent_last"
          placeholder="Last Name"
          value={formData.parent_last}
          onChange={handleChange}
        />

        {/* Contact Info */}
        <h3>Contact Information <span class="red-star">*</span></h3>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button1">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
