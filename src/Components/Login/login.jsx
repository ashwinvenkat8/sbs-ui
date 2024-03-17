import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css'; // Make sure the path to your CSS file is correct

const LoginForm = ({ onRegisterRedirect }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);

    // Function to handle reCAPTCHA token change
    const onReCAPTCHAChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !captchaToken) {
            setErrorMessage('Please fill out all fields and verify the CAPTCHA.');
            return;
        }

        // Perform your AJAX/Fetch login request here with username, password, and captchaToken

        console.log('Login attempt:', { username, password, captchaToken });

        // After the submission logic, you might want to reset the CAPTCHA
        setCaptchaToken(null);
        // If you're using a component to display reCAPTCHA, you might also need to reset it here
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

                <ReCAPTCHA
                    sitekey="6Lds_ZopAAAAAG-_A3KMQ_EPvc3uqE8MJgE4q2Y"
                    onChange={onReCAPTCHAChange}
                    size="invisible" // or "normal" if you want the checkbox
                    badge="inline" // optional, inline to make it show in the form
                />

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit" className="login-button">Login</button>
                <div className="links">
                    <a href="#" onClick={onRegisterRedirect}>New Registration</a>
                    <a href="#">Forgot Password?</a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
