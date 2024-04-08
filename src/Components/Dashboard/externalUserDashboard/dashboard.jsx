

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import based on the library version
import { Profile } from './profile';
import { TransferFunds } from './transferfunds';
import { AddFunds } from './addfunds';
import { TransactionHistory } from './transactionhistory';

const UserDashboard = () => {
    
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('welcome');
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                
                const decoded = jwtDecode(token);
                setUsername(decoded.username); // Assuming the username is stored in the token
                // Optionally, fetch additional user details from the backend if needed
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Adjust based on your auth token storage method
        navigate('/login'); // Adjust based on your login route
    };

    const updateBalance = (newBalance) => {
        setBalance(newBalance); // Update balance in state
    };

    const renderContent = () => {
        switch (currentView) {
            case 'profile':
                return <Profile token={localStorage.getItem('authToken')} />;
            case 'transactionHistory':
                return <TransactionHistory token={localStorage.getItem('authToken')} />;
            case 'transferFunds':
                return <TransferFunds token={localStorage.getItem('authToken')} onCancel={() => setCurrentView('dashboard')} />;
                case 'addFunds':
                    return <AddFunds token={localStorage.getItem('authToken')} onCancel={() => setCurrentView('welcome')} onFundsAdded={updateBalance} />;
            default:
                return (
                    <div>
                        <h2>Welcome, {username || 'User'}!</h2>
                        <p>Current Balance: ${balance}</p>
                    </div>
                );
        }
    };

    return (
        <div className="user-dashboard">
            <nav>
                <button onClick={() => setCurrentView('welcome')}>Home</button>
                <button onClick={() => setCurrentView('profile')}>Profile</button>
                <button onClick={() => setCurrentView('transactionHistory')}>Transaction History</button>
                <button onClick={() => setCurrentView('transferFunds')}>Transfer Funds</button>
                <button onClick={() => setCurrentView('addFunds')}>Add Funds</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default UserDashboard;
