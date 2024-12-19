import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (err) {
      alert("Failed to fetch user data.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/auth/${user._id}`,
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User updated successfully!");
      fetchUser();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Account deleted successfully!");
      localStorage.removeItem("token");
      navigate("/register");
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-container">
      <div className="user-card">
        <h2>User Profile</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Update</button>
        </form>
        <button className="delete-button" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
