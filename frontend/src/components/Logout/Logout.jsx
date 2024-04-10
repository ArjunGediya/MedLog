import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      let response;
      fetch("/api/v1/Patient-Tracker/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/login");
        });
      console.log("Logout from account");
    } catch (error) {
      console.log("Logout : ", error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

export default Logout;
