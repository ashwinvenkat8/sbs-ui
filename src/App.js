import React from 'react';
import { BrowserRouter as Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
    {
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '/register',
                element: <RegistrationForm />,
            },
            {
                path: '/customer/dashboard',
                element: (
                    <ProtectedRoute>
                        <CustomerDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/merchant/dashboard',
                element: (
                    <ProtectedRoute>
                        <MerchantDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/internal/admin/dashboard',
                element: (
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/internal/manager/dashboard',
                element: (
                    <ProtectedRoute>
                        <ManagerDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/internal/employee/dashboard',
                element: (
                    <ProtectedRoute>
                        <EmployeeDashboard />
                    </ProtectedRoute>
                ),
            },
        ]
    }
]);

const App = () => {
    return (
        <div className="App">
            <RouterProvider router={router} />;
        </div>
    );
}

export default App;
