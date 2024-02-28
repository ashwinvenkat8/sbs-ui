import React from "react";
// import bg from "../Assets/bg.svg";
// import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = ({ navigateTo }) => { // Destructure navigateTo from props
  return (
    <div className="home-container">
      <Navbar navigateTo={navigateTo} /> 
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Easy Bank is Everything you need now!
          </h1>
          <p className="primary-text">
            Take your financial life online. Your Easy Bank account will be a one-stop-shop for sending, saving, budgeting, withdrawing, and much more.
          </p>
          <button className="secondary-button" onClick={() => navigateTo('login')}> {/* Use navigateTo on click */}
            Register/Log-in <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
