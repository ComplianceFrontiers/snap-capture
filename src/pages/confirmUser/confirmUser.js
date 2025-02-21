import React, { useState } from "react";
import "../confirmUser/confirmUser.css"; // Reuse the same CSS for styling
import Visitor from "../visitor/visitor";
import PolicyAcknowledgement from "../PolicyAcknowledgement/PolicyAcknowledgement";

const ConfirmUser = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVisitor, setShowVisitor] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleConfirm = () => {
    if (!selectedUser) {
      alert("Please select a user to continue.");
      return;
    }
    setShowPolicy(true); // Update state to show PolicyAcknowledgement
  };

  if (showVisitor) {
    return <Visitor />;
  }

  if (showPolicy) {
    return <PolicyAcknowledgement user={selectedUser} />;
  }

  return (
    <div className="selection-container">
      <div className="back-button" onClick={() => setShowVisitor(true)}>
        <span className="back-icon">←</span> Back
      </div>
      <h2>Confirm Profile</h2>
      <div className={`grid-container ${users.length === 1 ? "single-user" : ""}`}>
        {users.map((user) => (
          <div
            key={user.user_id}
            className={`selection-box ${selectedUser?.user_id === user.user_id ? "selected" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="user-content">
              {/* Profile Picture */}
              <div className="profile-container">
                <img 
                  src={`data:image/jpeg;base64,${user.profile_pic}`} 
                  alt="Profile" 
                  className="profile-pic"
                />
              </div>
              
              {/* User Details */}
              <div className="user-details">
                <p><span>Name:</span> {user.player_first} {user.player_last}</p>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Phone:</span> {user.phone}</p>
                <p><span>Last Sign-in:</span> {new Date(user.last_signin).toLocaleString()}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Align Confirm Button to the Right */}
      <div style={{ width: "100%"}}>
        <button
          className="confirm-button2"
          onClick={handleConfirm}
          style={{ marginTop: "20px" }}
        >
          Confirm Login
        </button>
      </div>
    </div>
  );
};

export default ConfirmUser;
