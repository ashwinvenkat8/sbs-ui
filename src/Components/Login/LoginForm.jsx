import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DOMPurify from "dompurify";
import bcrypt from "bcryptjs-react";

import "./Login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    // Checking for empty fields
    if (!username || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Checking for special characters in username field
    if (alphanumericRegex.test(username)) {
      setErrorMessage(
        "Please enter the correct username (in alphanumeric only)"
      );
    }

    // Checking password minimum length
    if (password.length() < 12) {
      setErrorMessage(
        "The password length is too small, please keep the length at least 12"
      );
    }

    try {
      const sanitizedUsername = DOMPurify.sanitize(username);

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sanitizedUsername,
            passwordHash,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // localStorage.setItem("authToken", data.token);

        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.role;

        if (userRole === "SYSTEM_ADMIN") {
          navigate("/admin_dashboard");
        } else if (userRole === "SYSTEM_MANAGER") {
          navigate("/mgr_dashboard");
        } else if (userRole === "EMPLOYEE") {
          navigate("/emp_dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrorMessage(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to connect to the login service.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
        <div className="links">
          <Link to="/register">New Registration</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="form-footer-button"
        >
          Home
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
