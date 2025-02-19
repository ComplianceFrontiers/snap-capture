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
    return <PolicyAcknowledgement />;
  }

  return (
    <div className="selection-container">
      <div className="back-button" onClick={() => setShowVisitor(true)}>
        <span className="back-icon">←</span> Back
      </div>
      <h2>Select Your Profile</h2>
      <div className="grid-container">
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
      <button className="confirm-button2" onClick={handleConfirm}>
        Confirm Login
      </button>
    </div>
  );
};

export default ConfirmUser;
