


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import RegistrationForm from './Components/Register/registrationForm';
import LoginForm from './Components/Login/login';
import MainLayout from './Components/Dashboard/userDashboard/MainLayout'; // Assuming you have a Dashboard component
import AdminDashboard from './Components/Dashboard/internalUserDashboard/admin';
import LogoutButton from './Components/logout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<><Home /><Work /><Contact /><Footer /></>} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/dashboard/*" element={<MainLayout />} />
                    {/* Define other routes as needed */}
                    <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
