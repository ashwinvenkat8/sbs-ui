import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import RegistrationForm from './Components/Register/registrationForm';
import LoginForm from './Components/Login/LoginForm';
import AdminDashboard from './Components/Dashboard/internalUserDashboard/admin/admindashboard';
import UserDashboard from './Components/Dashboard/externalUserDashboard/user/dashboard';
import MerchantDashboard from './Components/Dashboard/externalUserDashboard/merchant/merchantdashboard';
import ManagerDashboard from './Components/Dashboard/internalUserDashboard/sysManager/managerdashboard';
import EmployeeDashboard from './Components/Dashboard/internalUserDashboard/employee/employeedashboard';
// import { useAuth } from './Components/Auth/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Check for authentication token
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<><Home /><Work /><Contact /><Footer /></>} />
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

