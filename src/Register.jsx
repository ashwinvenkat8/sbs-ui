import React, { useState } from "react";
import './login.css';

export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [ssn, setSsn] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('CUSTOMER');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:6000/api/v1/auth/register', { // Adjust the API endpoint as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: pass,
                    first_name: firstName,
                    middle_name: middleName,
                    last_name: lastName,
                    date_of_birth: dob,
                    gender: gender,
                    ssn: ssn,
                    address: address,
                    phone_number: phone,
                    role: role,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert('Registration Successful. You can now log in.');
                props.onFormSwitch('login'); // Switch to login form if implemented
            } else {
                alert(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.toString()}`);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username" />

                <label htmlFor="firstName">First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />

                <label htmlFor="middleName">Middle Name</label>
                <input value={middleName} onChange={(e) => setMiddleName(e.target.value)} id="middleName" placeholder="Middle Name" />

                <label htmlFor="lastName">Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPassword" name="confirmPassword" />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(   )-   -   " id="phoneNumber" name="phoneNumber" />

                <label htmlFor="dob">Date of Birth</label>
                <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" id="dob" name="dob" />

                <label htmlFor="gender">Gender</label>
                <input value={gender} onChange={(e) => setGender(e.target.value)} id="gender" placeholder="Gender" />

                <label htmlFor="ssn">SSN</label>
                <input value={ssn} onChange={(e) => setSsn(e.target.value)} id="ssn" placeholder="SSN" />

                <label htmlFor="address">Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} id="address" placeholder="Address" />

                <label htmlFor="role">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role">
                    <option value="CUSTOMER">Customer</option>
                    <option value="MERCHANT">Merchant</option>
                </select>

                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    );
};
