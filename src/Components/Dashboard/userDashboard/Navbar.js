
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.svg";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: '#cfe0e8' }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mx-3 mx-lg-5">
          <img src={Logo} alt="easybank logo" />
        </Link>

        <form className="d-flex">
          <Link
            className="btn btn-outline-light mx-3 mx-lg-5"
            type="button"
            to={`/`}
            style={{ backgroundColor: '#36486b' }} 
          >
            Sign out
          </Link>
        </form>
      </div>
    </nav>
  );
}
