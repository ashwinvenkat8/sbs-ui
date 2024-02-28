import React, { useState } from "react";
import './login.css'

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('Regular Employee');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, role);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label htmlFor="role">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role">
                    <option value="Regular Employee">Regular Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Guest User">Guest User</option>
                </select>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
