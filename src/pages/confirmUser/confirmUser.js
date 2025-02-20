import React, { useState } from "react";
import "../confirmUser/confirmUser.css"; // Reuse same CSS for styling
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
    if (showPolicy) {
      return <PolicyAcknowledgement user={selectedUser} />;
    }
    
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
            className={`selection-box ${
              selectedUser?.user_id === user.user_id ? "selected" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="user-content">
              <p className="user-name">
                {user.first_name} {user.last_name}
              </p>
              <p className="user-email">Email: {user.email}</p>
              <p className="user-phone">Phone: {user.phone}</p>
              <p className="user-signin">
                Last Sign-in: {new Date(user.last_signin).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Align Confirm Button to the Right */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
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
