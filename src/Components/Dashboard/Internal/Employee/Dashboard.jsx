import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EmployeeProfile from "./Profile";
import ApprovedReviews from "./ApprovedTransactions";
import RequestTransactions from "./RequestAccountTransactions";
import "../Internal.css";
import { useAuth } from "../../../Auth/AuthProvider";

const EmployeeDashboard = () => {

  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [currentView, setCurrentView] = useState("Dashboard");
  const [userDetails, setUserDetails] = useState({});
  const [userAttributes, setUserAttributes] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const decodeToken = jwtDecode(token);

        if (!token) throw new Error("JWT not found");

        const userId = decodeToken.userId;
        const userResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        if (!userResponse.ok) throw new Error("Failed to fetch user details");

        const userData = await userResponse.json();

        setUserDetails(userData);
        setUserAttributes(userData.attributes);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const renderContent = () => {
    const welcomeMessage = userAttributes.first_name
      ? `Welcome, ${userAttributes.first_name}`
      : "Welcome";
    const lastLogin = new Date(userDetails.last_login).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      hour12: true,
    });

    switch (currentView) {
      
      case "Profile":
        return <EmployeeProfile />;
      
      case "ApprovedTransactions":
        return <ApprovedReviews />;
      
      case "RequestTransactions":
        return <RequestTransactions />;
      
      default:
        return (
          <div className="welcome-message">
            <center>
              <h1>{welcomeMessage}</h1>
              <p className="welcome-message">Last Login: {lastLogin}</p>
              <br />
            </center>
          </div>
        );
    }
  };

  return (
    <div className="internal-dashboard">
      
      <h1>Employee Dashboard</h1>
      <nav>

        <button onClick={() => setCurrentView("Profile")}>Profile</button>
        <button onClick={() => setCurrentView("RequestTransactions")}>Request Account Transactions</button>
        <button onClick={() => setCurrentView("ApprovedTransactions")}>Approved Transactions</button>
        <button onClick={handleLogout}>Logout</button>
      
      </nav>

      {renderContent()}
    
    </div>
  );
};

export default EmployeeDashboard;
