import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import RegistrationForm from './Components/Register/RegistrationForm';
import LoginForm from './Components/Login/LoginForm';
import AdminDashboard from './Components/Dashboard/Internal/SystemAdmin/Dashboard';
import UserDashboard from './Components/Dashboard/External/Customer/Dashboard';
import MerchantDashboard from './Components/Dashboard/External/Merchant/Dashboard';
import ManagerDashboard from './Components/Dashboard/Internal/SystemManager/Dashboard';
import EmployeeDashboard from './Components/Dashboard/Internal/Employee/Dashboard';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Check for authentication token
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant_dashboard"
                        element={
                            <ProtectedRoute>
                                <MerchantDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin_dashboard/"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/mgr_dashboard/"
                        element={
                            <ProtectedRoute>
                                <ManagerDashboard />
                            </ProtectedRoute>
                        }
                    />
                       <Route
                        path="/emp_dashboard/"
                        element={
                            <ProtectedRoute>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

