import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signout.css";
import Signin from "../signin/signin";
import ThankYouMessage from "../ThankYouSignout/ThankYouSignout";

const SignOutContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVisitor, setShowVisitor] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
  if (showVisitor) {
    return <Signin />;
  }

  const handleSignOut = async (user_id) => {
    try {
      const response = await axios.post("https://snap-capture-backend.vercel.app/update_signin", {
        user_id: user_id,
        signin: false,
      });
  
      if (response.data.success) {
        setShowThankYou(true); // Show ThankYouMessage
  
        setTimeout(() => {
          window.location.reload(); // Refresh the page after 1 second
        }, 1000);
      }
    } catch (error) {
      console.error("Error signing out user:", error);
      alert("Failed to sign out user.");
    }
  };
  if (showThankYou) {
    return <ThankYouMessage />;
  }
  

  return (
    <div className="signOutContainer">
        <div className="back-button" onClick={() => setShowVisitor(true)}>
        <span className="back-icon">←</span> Back
      </div>
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
              <span>{user.player_first} {user.player_last}</span>
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
