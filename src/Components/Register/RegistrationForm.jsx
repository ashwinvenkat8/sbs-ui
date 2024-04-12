import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import QRCode from "qrcode";
import "./Registration.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    ssn: "",
    phoneNumber: "",
    address: "",
    userRole: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showSSN, setShowSSN] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPEnrollment, setShowOTPEnrollment] = useState(false);
  let [userId, setUserId] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitRegistrationForm = async (e) => {
    e.preventDefault();

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(formData.username)) {
      setErrorMessage("Please make sure the username is Alphanumeric");
      return;
    }

    if (formData.password.length < 12) {
      setErrorMessage(
        "The password length is too small, please keep the length at least 12"
      );
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const passwordHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-512", new TextEncoder().encode(formData.confirmPassword)))).map((b) => b.toString(16).padStart(2, "0")).join("");

    const userData = {
      username: DOMPurify.sanitize(formData.username),
      email: DOMPurify.sanitize(formData.email),
      password: passwordHash,
      first_name: DOMPurify.sanitize(formData.firstName),
      last_name: DOMPurify.sanitize(formData.lastName),
      date_of_birth: DOMPurify.sanitize(formData.dateOfBirth),
      gender: DOMPurify.sanitize(formData.gender),
      ssn: DOMPurify.sanitize(formData.ssn),
      address: DOMPurify.sanitize(formData.address),
      phone_number: DOMPurify.sanitize(formData.phoneNumber),
      role: DOMPurify.sanitize(formData.userRole),
    };

    try {
      const registrationResponse = await fetch(
        process.env.REACT_APP_API_URL + "/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(errorData.message || "Failed to register");
      }

      const registrationData = await registrationResponse.json();

      const uid = registrationData.user;

      setUserId(uid);

      setShowOTPEnrollment(true);

      const qrResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/otp/enroll`,
        {
          method: "GET",
          headers: {
            "X-User": `${uid}`,
          },
        }
      );

      const qrData = await qrResponse.json();

      await QRCode.toDataURL(qrData.url).then(setQRCodeURL);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred during registration."
      );
    }
  };

  const handleOTPEnrollment = async (e) => {
    e.preventDefault();

    try {
      const otpResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/otp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User": `${userId}`,
          },
          body: JSON.stringify({ token: formData.otp }),
        }
      );

      if (otpResponse.ok) {
        alert(
          "Registration Successful, You are now being redirected to home page"
        );
        navigate("/");
      } else {
        navigate("/register");
        throw new Error("Error in verifying OTP");
      }
    } catch (error) {
      alert("Error in QR Code generation/fetching");
    }
  };

  const toggleSSNVisibility = () => setShowSSN(!showSSN);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="registration-container">
      <form
        className="form-section"
        onSubmit={
          showOTPEnrollment ? handleOTPEnrollment : submitRegistrationForm
        }
      >
        <h2>Registration</h2>
        {!showOTPEnrollment && (
          <>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>SSN (Social Security Number)</label>
              <div className="input-group">
                <input
                  type={showSSN ? "text" : "password"}
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  maxLength="9"
                  required
                />
                <button
                  type="button"
                  onClick={toggleSSNVisibility}
                  className=""
                >
                  {showSSN ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>User Type</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="CUSTOMER">Customer</option>
                <option value="MERCHANT">Merchant</option>
              </select>
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="7"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className=""
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </>
        )}
        {showOTPEnrollment && (
          <div>
            <label>Please scan QR Code on Google Authenticator</label>
            <img src={qrCodeURL} alt="qrcode url" />
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button">
          {showOTPEnrollment ? "Verify OTP" : "Register"}
        </button>
        {!showOTPEnrollment && (
          <div className="links">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        )}
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

export default RegistrationForm;
