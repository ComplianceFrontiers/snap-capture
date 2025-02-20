import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signout.css";

const SignOutContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    fetchTodayLogins(today);
  }, []);

  const fetchTodayLogins = async (date) => {
    try {
      const response = await axios.get(`https://snap-capture-backend.vercel.app/today_logins?date=${date}`);
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching today's logins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (user_id) => {

    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/update_signin", {
        user_id: user_id,
        signin: false,
      });

      if (response.data.success) {
        setUsers(users.filter((user) => user.user_id !== user_id)); // Remove user from list
      }
    } catch (error) {
      console.error("Error signing out user:", error);
      alert("Failed to sign out user.");
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
              <span>{user.first_name} {user.last_name}</span>
              <span className="timestamp">Today</span>
              <button className="signOutBtn" onClick={() => handleSignOut(user.user_id)}>Sign Out</button>
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
