import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DOMPurify from "dompurify";
import "./Login.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpRequired, setIsOtpRequired] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        // Checking for empty fields
        if (!username || !password) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        // Checking for special characters in username field
        if (!alphanumericRegex.test(username)) {
            setErrorMessage(
                "Please enter the correct username (in alphanumeric only)"
            );
            return;
        }
        // Checking password minimum length
        if (password.length < 12) {
            setErrorMessage(
                "The password length is too small, please keep the length at least 12"
            );
            return;
        }

        try {
            const sanitizedUsername = DOMPurify.sanitize(username);

            const passwordHash = Array.from(
                new Uint8Array(
                    await crypto.subtle.digest(
                        "SHA-512",
                        new TextEncoder().encode(password)
                    )
                )
            ).map((b) => b.toString(16).padStart(2, "0")).join("");

            const loginResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: sanitizedUsername,
                        password: passwordHash,
                    }),
                }
            );
            
            const loginData = await loginResponse.json();
            
            if(loginResponse.status === 404) {
                setErrorMessage(loginData.message);
                setUsername("");
                setPassword("");
                return;
            }

            if(loginResponse.status === 401) {
                setErrorMessage(loginData.error);
                setUsername("");
                setPassword("");
                return;
            }

            if (loginResponse.ok) {
                setUserId(loginData.user);
                setIsOtpRequired(true);
            } else {
                throw new Error(loginData.message || "Login failed");
            }

        } catch (error) {
            console.log(`Login Error: ${error.message}`);
            setUsername("");
            setPassword("");
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        try {
            const otpResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/otp/validate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-User": `${userId}`,
                    },
                    body: JSON.stringify({
                        token: otp,
                    }),
                }
            );

            const otpData = await otpResponse.json();

            if (otpResponse.ok) {
                localStorage.setItem("authToken", otpData.token);
                const decodedToken = jwtDecode(otpData.token);
                const userRole = decodedToken.role;

                switch (userRole) {
                    case "SYSTEM_ADMIN":
                        navigate("/internal/admin/dashboard");
                        break;
                    case "SYSTEM_MANAGER":
                        navigate("/internal/manager/dashboard");
                        break;
                    case "EMPLOYEE":
                        navigate("/internal/employee/dashboard");
                        break;
                    case "MERCHANT":
                        navigate("/merchant/dashboard");
                        break;
                    default:
                        navigate("/customer/dashboard");
                }
            } else {
                setErrorMessage(otpData.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            alert("OTP verification error:", error);
        }
    };

    return (
        <div className="login-container">
            <center><img className="easybank-logo" src="logo512.png" alt="The logo of EasyBank, which is the name itself in Wavefont" /></center>
            <h1>Login</h1>
            <br />
            <form onSubmit={isOtpRequired ? handleOtpVerification : handleLoginSubmit}>
                {!isOtpRequired && (
                    <>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErrorMessage("");
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    required
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="toggle-visibility">
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {isOtpRequired && (
                    <div>
                        <label>OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                )}

                {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}

                <center>
                    <button type="submit" className="login-button">
                        {isOtpRequired ? "Verify OTP" : "Login"}
                    </button>
                </center>
                <br />
                {!isOtpRequired && (
                    <div>
                        <center><Link className="link" to="/register">Register</Link></center>
                    </div>
                )}
                <br /><br />
                <center>
                    <Link className="link home" to="/">&lt; Home</Link>
                </center>
            </form>
        </div>
    );
};

export default LoginForm;
