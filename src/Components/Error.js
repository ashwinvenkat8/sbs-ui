import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-banner-container">
        <div className="error-text-section">
          <h2 className="secondary-heading">
            Page Not Found
          </h2>
          <p className="secondary-text">
            404
          </p>
          <div className="auth-buttons">
            <Link className="link home" to="/">&lt; Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
