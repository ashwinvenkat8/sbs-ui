import React from "react";
// import bg from "../Assets/bg.svg";
// import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate(); // Use useNavigate here

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Easy Bank is Everything you need now!
          </h1>
          <p className="primary-text">
            Take your financial life online. Your Easy Bank account will be a one-stop-shop for sending, saving, budgeting, withdrawing, and much more.
          </p>
          <button className="secondary-button" onClick={() => navigate('/login')}> {/* Update the navigate call */}
            Register/Log-in <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
