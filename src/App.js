import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Error from './Components/Error';
import RegistrationForm from './Components/Register/RegistrationForm';
import LoginForm from './Components/Login/LoginForm';
import AdminDashboard from './Components/Dashboard/Internal/SystemAdmin/Dashboard';
import CustomerDashboard from './Components/Dashboard/External/Customer/Dashboard';
import MerchantDashboard from './Components/Dashboard/External/Merchant/Dashboard';
import ManagerDashboard from './Components/Dashboard/Internal/SystemManager/Dashboard';
import EmployeeDashboard from './Components/Dashboard/Internal/Employee/Dashboard';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
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
                    <Route path="/forgot-password" element={<Error />} />
                    <Route
                        path="/customer/dashboard"
                        element={
                            <ProtectedRoute>
                                <CustomerDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant/dashboard"
                        element={
                            <ProtectedRoute>
                                <MerchantDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/internal/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/internal/manager/dashboard"
                        element={
                            <ProtectedRoute>
                                <ManagerDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/internal/employee/dashboard"
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
