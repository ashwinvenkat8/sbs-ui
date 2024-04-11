import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DOMPurify from "dompurify";
//import jwt_decode from 'jwt-decode';
import bcrypt from "bcryptjs-react";

import "./Login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(""); // New state for OTP
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  //password toggling
  const togglePasswordVisibility = () => { 
    setShowPassword(!showPassword);
  };


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
    if (password.length < 12) {
      setErrorMessage(
        "The password length is too small, please keep the length at least 12"
      );
    }

    try {
      const sanitizedUsername = DOMPurify.sanitize(username);

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

    
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: sanitizedUsername, // assuming you still want to sanitize
          password // send the password as plain text, similar to Postman request
        }),
      });
      
      const data = await response.json();

 

  if (response.ok) {
    localStorage.setItem("authToken", data.token);

    console.log(data)
    const decodedToken = jwtDecode(data.token);
    console.log(decodedToken) // Corrected function call
    const userRole = decodedToken.role;

    switch (userRole) {
      case "SYSTEM_ADMIN":
        navigate("/admin_dashboard");
        break;
      case "SYSTEM_MANAGER":
        navigate("/mgr_dashboard");
        break;
      case "EMPLOYEE":
        navigate("/emp_dashboard");
        break;
      case "MERCHANT":
        navigate("/merchant_dashboard");
        break;
      default:
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          
          />
          <button type="button" onClick={togglePasswordVisibility} className="toggle-password"> 
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
        <div className="links">
          <Link to="/register">New Registration</Link>
          {/* <Link to="/forgot-password">Forgot Password?</Link> */}
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


//

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";
// import DOMPurify from "dompurify";
// import bcrypt from "bcryptjs-react";

// import "./Login.css";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); 
//   const [errorMessage, setErrorMessage] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpRequired, setIsOtpRequired] = useState(false);

//   //password toggling
//   const togglePasswordVisibility = () => { 
//     setShowPassword(!showPassword);
//   };

//   const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    
//         // Checking for empty fields
//         if (!username || !password) {
//           setErrorMessage("Please fill out all fields.");
//           return;
//         }
    
//         // Checking for special characters in username field
//         if (alphanumericRegex.test(username)) {
//           setErrorMessage(
//             "Please enter the correct username (in alphanumeric only)"
//           );
//         }
    
//         // Checking password minimum length
//         if (password.length < 12) {
//           setErrorMessage(
//             "The password length is too small, please keep the length at least 12"
//           );
//         }
    
//         try {
//           const sanitizedUsername = DOMPurify.sanitize(username);
    
//           const salt = bcrypt.genSaltSync(10);
//           const passwordHash = bcrypt.hashSync(password, salt);
    
        
//           const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               username: sanitizedUsername, // assuming you still want to sanitize
//               password // send the password as plain text, similar to Postman request
//             }),
//           });
          
//           const data = await response.json();
    
//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
    
//         console.log(data)
//         const decodedToken = jwtDecode(data.token);
//         console.log(decodedToken) // Corrected function call
//         const userRole = decodedToken.role;
    
//         switch (userRole) {
//           case "SYSTEM_ADMIN":
//             navigate("/admin_dashboard");
//             break;
//           case "SYSTEM_MANAGER":
//             navigate("/mgr_dashboard");
//             break;
//           case "EMPLOYEE":
//             navigate("/emp_dashboard");
//           case "MERCHANT":
//               navigate("/merchant_dashboard");
//             break;
//           default:
//             navigate("/dashboard");
//         }
//       } else {
//         setErrorMessage(data.message || "An error occurred during login.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("Failed to connect to the login service.");
//     }
//     };

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     // Call backend OTP verification endpoint
//     // Assuming the endpoint is "/verify-otp" and expects { username, otp }
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username, // Use the username from state
//           otp
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // OTP verification successful, navigate to user dashboard or relevant page
//         localStorage.setItem("authToken", data.token);
//         navigate("/dashboard"); // Modify as needed
//       } else {
//         // Handle OTP verification failure
//         setErrorMessage(data.message || "Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       setErrorMessage("Failed to verify OTP.");
//     }
//   };

  

//   return (
//     <div className="login-container">
//       <form onSubmit={isOtpRequired ? handleOtpVerification : handleLoginSubmit}>
//         <h2>Login</h2>
//         {!isOtpRequired && (
//           <>
//             <div className="input-field">
//               <label>Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <label>Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </>
//         )}
//         {isOtpRequired && (
//           <div className="input-field">
//             <label>OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         {errorMessage && <div className="error-message">{errorMessage}</div>}

//         <button type="submit" className="login-button">
//           {isOtpRequired ? "Verify OTP" : "Login"}
//         </button>
//         {!isOtpRequired && (
//           <div className="links">
//             <Link to="/register">New Registration</Link>
//             {/* <Link to="/forgot-password">Forgot Password?</Link> */}
//           </div>
//         )}
//         <button
//           type="button"
//           onClick={() => navigate("/")}
//           className="form-footer-button"
//         >
//           Home
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
