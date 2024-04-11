

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './admin.css'

// Sub-components for different admin views
import AdminProfile from './adminProfile';
import ListUsers from './listUsers';
import AuthorizeTransactions from './approvedreviews';
import { useAuth } from '../../../Auth/AuthProvider';
import RequestReviews from './requestaccountrevies';
import DeletionRequest from './deletionrequests';
import ApprovedReviews from './approvedreviews';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [currentView, setCurrentView] = useState('authorizeTransactions');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUsername(decoded.username); // Assuming the decoded token contains username
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/login');
        }
    }, [navigate]);

  

    const renderContent = () => {
        switch (currentView) {
            case 'profile':
                return <AdminProfile token={localStorage.getItem('authToken')} />;
            case 'listUsers':
                return <ListUsers token={localStorage.getItem('authToken')} />;
            case 'approvedreviews':
                return <ApprovedReviews token={localStorage.getItem('authToken')} />;
            case 'requestReviews':
                return <RequestReviews token={localStorage.getItem('authToken')} />;
            case 'authorizeDeletion':
                return <DeletionRequest token={localStorage.getItem('authToken')} />;
            default:
                return <h2>Welcome, {username || 'Admin'}!</h2>;
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <nav>
                <button onClick={() => setCurrentView('profile')}>Profile</button>
                <button onClick={() => setCurrentView('listUsers')}>List Users</button>
                <button onClick={() => setCurrentView('requestReviews')}>Request Account Reviews</button>
                <button onClick={() => setCurrentView('approvedreviews')}>Approved Reviews</button>
                <button onClick={() => setCurrentView('authorizeDeletion')}>Authorize deletion request</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default AdminDashboard;




