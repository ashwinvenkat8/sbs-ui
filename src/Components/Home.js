import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            EasyBank
          </h1>
          <p className="primary-text">
            Easy. Secure. Reliable.
          </p>
          <img src="logo512.png" alt="The logo of EasyBank, which is the name itself in Wavefont" />
          <div className="auth-buttons">
            <button className="primary-button" onClick={() => navigate('/register')}>Register</button>
            <button className="primary-button" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
