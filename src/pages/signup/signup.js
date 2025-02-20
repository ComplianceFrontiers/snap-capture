import React, { useState } from "react";
import "./signup.css";
import Visitor from "../visitor/visitor.js";
import axios from "axios";

const Signup = ({ onBack }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
        <input
          type="text"
          name="first_name"
          placeholder="Enter First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
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
