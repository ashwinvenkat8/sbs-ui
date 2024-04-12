import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            418 I'm a teapot :)
          </h1>
          <p className="primary-text">
            This has not been implemented yet.
          </p>
          <div className="auth-buttons">
            <button className="primary-button" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
