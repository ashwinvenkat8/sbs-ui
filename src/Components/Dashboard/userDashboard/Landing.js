

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.svg";
import NavBar from "./Navbar"; // Ensure this is the correct path

export default function Dashboard() {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem('authToken');
  
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is your personalized banking dashboard.</p>
        {isAuthenticated ? (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Account Overview</h5>
                  <p className="card-text">View your account summary and transactions.</p>
                  <Link to="/account/userId" className="btn btn-primary" style={{ backgroundColor: '#36486b' }}>View Account</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Transfer Money</h5>
                  <p className="card-text">Transfer money between your accounts or to other users.</p>
                  <Link to="/transactions/index" className="btn btn-primary" style={{ backgroundColor: '#36486b' }}>Transfer Money</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Please <Link to="/login">log in</Link> to view your account and make transactions.</p>
          </div>
        )}
      </div>
    </div>
  );
}


