import React, { useState } from "react";
import "./confirmUser.css"; // Reuse same CSS for styling

const ConfirmUser = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleConfirm = () => {
    if (!selectedUser) {
      alert("Please select a user to continue.");
      return;
    }
    alert(`User confirmed: ${selectedUser.first_name} ${selectedUser.last_name}`);
    // Proceed with login (store user in state or navigate)
  };

  return (
    <div className="user-selection-container">
      <h2>Select Your Profile</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div
            key={user.user_id}
            className={`user-box ${selectedUser?.user_id === user.user_id ? "selected" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <p><strong>{user.first_name} {user.last_name}</strong></p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Last Sign-in: {new Date(user.last_signin).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Confirm Login</button>
    </div>
  );
};

export default ConfirmUser;
