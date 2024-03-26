import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

 // Ensure jwt-decode is installed (npm install jwt-decode)

import './login.css'; // Make sure the path to your CSS file is correct

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('authToken', data.token);
                
                // Decode the JWT token to extract the user role
                const decodedToken = jwtDecode(data.token); // Decoding the token
                const userRole = decodedToken.role; // Assuming 'role' is the correct property

                // Role-based redirection
                if (userRole === 'SYSTEM_ADMIN') {
                    navigate('/admin_dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                // Handle errors, e.g., displaying a message to the user
                setErrorMessage(data.message || 'An error occurred during login.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Failed to connect to the login service.');
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

                <button type="submit" className="login-button">Login</button>
                <div className="links">
                    <Link to="/register">New Registration</Link>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button type="button" onClick={() => navigate('/')} className="form-footer-button">Home</button>
            </form>
        </div>
    );
};

export default LoginForm;
