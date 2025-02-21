import React, { useState } from "react";
import "../confirmUser/confirmUser.css"; 
import Visitor from "../visitor/visitor";
import PolicyAcknowledgement from "../PolicyAcknowledgement/PolicyAcknowledgement";

const defaultProfilePic = "/default-profile.png"; // Replace with your actual default image path

const ConfirmUser = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVisitor, setShowVisitor] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleConfirm = () => {
    if (!selectedUser) {
      alert("Please select a user to continue.");
      return;
    }
    setShowPolicy(true);
  };

  if (showVisitor) return <Visitor />;
  if (showPolicy) return <PolicyAcknowledgement user={selectedUser} />;
console.log("u",users[0])
  return (
    <div className="selection-container">
      <div className="back-button" onClick={() => setShowVisitor(true)}>
        <span className="back-icon">←</span> Back
      </div>
      <h2>Confirm Profile</h2>
      
      <div
        className={`selection-box ${selectedUser ? "selected" : ""}`}
        onClick={() => setSelectedUser(users[0])}
      >
        <div className="user-content">
          {/* Profile Picture (Handles Empty Profile) */}
          <div className="profile-container">
            <img 
              src={users[0]?.profile_pic ? `data:image/jpeg;base64,${users[0]?.profile_pic}` : defaultProfilePic} 
              alt="Profile" 
              className="profile-pic"
            />
          </div>

          {/* User Details */}
          <div className="user-details">
            <p><span>Name:</span> {users[0]?.player_first} {users[0]?.player_last}</p>
            <p><span>Email:</span> {users[0]?.email}</p>
            <p><span>Phone:</span> {users[0]?.phone}</p>
            <p><span>Last Sign-in:</span> {new Date(users[0]?.last_signin).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button className="confirm-button2" onClick={handleConfirm}>
        Confirm Login
      </button>
    </div>
  );
};

export default ConfirmUser;
