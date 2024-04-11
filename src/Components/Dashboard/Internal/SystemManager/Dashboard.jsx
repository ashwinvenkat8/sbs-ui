import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './Manager.css'
import { useAuth } from '../../../Auth/AuthProvider';
import RequestTransactions from './RequestAccountTransactions';
import ApprovedReviews from './ApprovedTransactions';
import ListTransactions from './ListTransaction';
import ManagerProfile from './Profile';
import AuthorizeTransactions from './AuthorizeTransactions';

const ManagerDashboard = () => {
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
                return <ManagerProfile token={localStorage.getItem('authToken')} />;
            case 'listtransactions':
                return <ListTransactions token={localStorage.getItem('authToken')} />;
            case 'approvedtransactions':
                return <ApprovedReviews token={localStorage.getItem('authToken')} />;
            case 'requesttransactions':
                return <RequestTransactions token={localStorage.getItem('authToken')} />;
            case 'authorizeTransaction':
                return <AuthorizeTransactions token={localStorage.getItem('authToken')} />;
            default:
                return <h2>Welcome, {username || 'Manager'}!</h2>;
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Manager Dashboard</h1>
            <nav>
                <button onClick={() => setCurrentView('profile')}>Profile</button>
                <button onClick={() => setCurrentView('listtransactions')}>List Transactions</button>
                <button onClick={() => setCurrentView('requesttransactions')}>Request Account Transactions</button>
                <button onClick={() => setCurrentView('approvedtransactions')}>Approved Transactions</button>
                <button onClick={() => setCurrentView('authorizeTransaction')}>Authorize Transaction</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default ManagerDashboard;




