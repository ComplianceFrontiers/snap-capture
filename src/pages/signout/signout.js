import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signout.css";

const SignOutContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayLogins();
  }, []);

  const fetchTodayLogins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/today_logins");
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching today's logins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signOutContainer">
      <h2>Today's Logged In Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <ul className="userList">
          {users.map((user) => (
            <li key={user.user_id} className="userItem">
              <img
                src={user.profile_pic ? `data:image/png;base64,${user.profile_pic}` : "/default-avatar.png"}
                alt="Profile"
                className="profilePic"
              />
              <span>{user.user_id}</span>
              <span className="timestamp">{user.last_signin}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users logged in today.</p>
      )}
    </div>
  );
};

export default SignOutContainer;
