import React from "react";
import online from "../Assets/icon-online.svg";
import budget from "../Assets/icon-budgeting.svg";
import api from "../Assets/icon-api.svg";

const Work = () => {
  const workInfoData = [
    {
      image: online,
      title: "Banking Online",
      text: "Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world..",
    },
    {
      image: budget,
      title: "Simple Budgetting",
      text: "See exactly where your money goes each month. Receive notifications when you’re close to hitting your limits ",
    },
    {
      image: api,
      title: "Open API",
      text: "Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.",
    },
    
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Services</p>
        <h1 className="primary-heading">Why choose Easybank?</h1>
        <p className="primary-text">
        Our modern web and mobile applications allow you to keep track of
              your finances wherever you are in the world.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;


