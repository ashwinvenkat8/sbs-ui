import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import QRCode from "qrcode";
import CustomerForm from "./CustomerForm";
import MerchantForm from "./MerchantForm";
import "./Registration.css";

const merchantValidationHandler = (customerFormData) => {
    if (
        Date.parse(customerFormData.ownerDob) < new Date(1900, 1, 1).getTime() ||
        Date.parse(customerFormData.businessDoi) < new Date(1900, 1, 1).getTime()
    ) {
        return "Date fields must be after January 1, 1900";
    }

    if (Date.parse(customerFormData.ownerDob) >= Date.now() || Date.parse(customerFormData.businessDoi) >= Date.now()) {
        return "Date fields must not be in the past";
    }

    if (!/^\d{9}$/.test(customerFormData.ownerSsn)) {
        return "SSN must be 9 digits";
    }
    
    if (!/^\d{9}$/.test(customerFormData.ein)) {
        return "EIN must be 9 digits";
    }

    if (!/^\d{10}$/.test(customerFormData.businessPhone) || !/^\d{10}$/.test(customerFormData.ownerPhone)) {
        return "Phone number fields must contain 10 digits";
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(customerFormData.username)) {
        return "Please make sure the username is alphanumeric";
    }

    const passwordBlacklist = [customerFormData.username, customerFormData.firstName, customerFormData.lastName, customerFormData.ssn, customerFormData.phoneNumber];
    if (passwordBlacklist.join("").includes(customerFormData.password)) {
        return "Your password must not contain any part of your personal information";
    }

    if (customerFormData.password.length < 12) {
        return "Minimum password length is 12 characters";
    }

    if (customerFormData.confirmPassword !== customerFormData.password) {
        return "Passwords do not match";
    }

    return '';
};

const customerValidationHandler = (customerFormData) => {
    if (Date.parse(customerFormData.dateOfBirth) >= Date.now()) {
        return "Date of birth must be in the past";
    }

    if (!/^\d{9}$/.test(customerFormData.ssn)) {
        return "SSN must be 9 digits";
    }

    if (!/^\d{10}$/.test(customerFormData.phoneNumber)) {
        return "Phone number must be 10 digits";
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(customerFormData.username)) {
        return "Please make sure the username is alphanumeric";
    }

    const passwordBlacklist = [customerFormData.username, customerFormData.firstName, customerFormData.lastName, customerFormData.ssn, customerFormData.phoneNumber];
    if (passwordBlacklist.join("").includes(customerFormData.password)) {
        return "Your password must not contain any part of your personal information";
    }

    if (customerFormData.password.length < 12) {
        return "Minimum password length is 12 characters";
    }

    if (customerFormData.confirmPassword !== customerFormData.password) {
        return "Passwords do not match";
    }

    return '';
};

const RegistrationForm = () => {
    const navigate = useNavigate();
    
    const [customerFormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        ssn: "",
        phoneNumber: "",
        address: "",
        userRole: "CUSTOMER",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    const [merchantFormData, setMerchantFormData] = useState({
        businessName: "",
        businessPhone: "",
        businessDoi: "",
        ein: "",
        address: "",
        ownerName: "",
        ownerDob: "",
        ownerGender: "",
        ownerSsn: "",
        ownerPhone: "",
        userRole: "MERCHANT",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    const [showSSN, setShowSSN] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOTPEnrollment, setShowOTPEnrollment] = useState(false);
    const [role, setRole] = useState("");
    const [otp, setOtp] = useState("");
    const [qrCodeURL, setQRCodeURL] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    let [userId, setUserId] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (role === "MERCHANT") {
            setMerchantFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));

        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        
        setErrorMessage("");
    };

    const submitRegistrationForm = async (e) => {
        e.preventDefault();

        let validationResult = '';

        if(role === 'MERCHANT') {
            validationResult = merchantValidationHandler(merchantFormData);
        } else {
            validationResult = customerValidationHandler(customerFormData);
        }

        if (validationResult) {
            setErrorMessage(validationResult);
            return;
        }

        const passwordHash = Array.from(
            new Uint8Array(
                await crypto.subtle.digest(
                    "SHA-512",
                    new TextEncoder().encode(
                        role === "MERCHANT" ? merchantFormData.password : customerFormData.password
                    )
                )
            )
        ).map((b) => b.toString(16).padStart(2, "0")).join("");

        let registrationPayload = null;

        if (role === "MERCHANT") {
            registrationPayload = {
                email: DOMPurify.sanitize(merchantFormData.email),
                username: DOMPurify.sanitize(merchantFormData.username),
                password: passwordHash,
                business_name: DOMPurify.sanitize(merchantFormData.businessName),
                business_phone: DOMPurify.sanitize(merchantFormData.businessPhone),
                business_doi: DOMPurify.sanitize(merchantFormData.businessDoi),
                ein: DOMPurify.sanitize(merchantFormData.ein),
                address: DOMPurify.sanitize(merchantFormData.address),
                owner_name: DOMPurify.sanitize(merchantFormData.ownerName),
                owner_dob: DOMPurify.sanitize(merchantFormData.ownerDob),
                owner_gender: DOMPurify.sanitize(merchantFormData.ownerGender),
                owner_ssn: DOMPurify.sanitize(merchantFormData.ownerSsn),
                owner_phone: DOMPurify.sanitize(merchantFormData.ownerPhone),
                role: DOMPurify.sanitize(merchantFormData.userRole),
            };
        } else {
            registrationPayload = {
                username: DOMPurify.sanitize(customerFormData.username),
                email: DOMPurify.sanitize(customerFormData.email),
                password: passwordHash,
                first_name: DOMPurify.sanitize(customerFormData.firstName),
                last_name: DOMPurify.sanitize(customerFormData.lastName),
                date_of_birth: DOMPurify.sanitize(customerFormData.dateOfBirth),
                gender: DOMPurify.sanitize(customerFormData.gender),
                ssn: DOMPurify.sanitize(customerFormData.ssn),
                address: DOMPurify.sanitize(customerFormData.address),
                phone_number: DOMPurify.sanitize(customerFormData.phoneNumber),
                role: DOMPurify.sanitize(customerFormData.userRole),
            };
        }

        try {
            const registrationResponse = await fetch(
                process.env.REACT_APP_API_URL + "/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationPayload),
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
                    body: JSON.stringify({ token: otp }),
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
        <div className="register-container">
            <center><img className="easybank-logo" src="logo512.png" alt="The logo of EasyBank, which is the name itself in Wavefont" /></center>
            <h1>Register</h1>
            <br />
            <form
                className="form-section"
                onSubmit={
                    showOTPEnrollment ? handleOTPEnrollment : submitRegistrationForm
                }
            >
                {!showOTPEnrollment && (
                    <>
                        <div>
                            <label>User Type</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select User Type</option>
                                <option value="CUSTOMER">Customer</option>
                                <option value="MERCHANT">Merchant</option>
                            </select>
                        </div>
                        {role === "CUSTOMER" && (
                            <CustomerForm
                                customerFormData={customerFormData}
                                handleChange={handleChange}
                                showSSN={showSSN}
                                toggleSSNVisibility={toggleSSNVisibility}
                                showConfirmPassword={showConfirmPassword}
                                toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                            />
                        )}
                        {role === "MERCHANT" && (
                            <MerchantForm
                                merchantFormData={merchantFormData}
                                handleChange={handleChange}
                                showSSN={showSSN}
                                toggleSSNVisibility={toggleSSNVisibility}
                                showConfirmPassword={showConfirmPassword}
                                toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                            />
                        )}
                    </>
                )}
                {showOTPEnrollment && (
                    <div>
                        <label>Please scan QR Code on Google Authenticator</label>
                        <center><img className='qrcode-2fa' src={qrCodeURL} alt="QR Code for two-factor authentication enrollment" /></center>
                        <label>OTP</label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                )}
                {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
                <br />
                <center>
                    <button type="submit" className="register-button">
                        {showOTPEnrollment ? "Verify OTP" : "Register"}
                    </button>
                </center>
                <br />
                {!showOTPEnrollment && (
                    <div>
                        <center><Link className="link" to="/login">Already have an account? Login</Link></center>
                    </div>
                )}
                <br />
                <center><Link className="link home" to="/">&lt; Home</Link></center>
            </form>
        </div>
    );
};

export default RegistrationForm;
