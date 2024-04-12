import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Profile } from './Profile';
import { TransferFunds } from './TransferFunds';
import { TransactionHistory } from './TransactionHistory';
import { useAuth } from '../../../Auth/AuthProvider';
import { NewPayment } from './NewPayment';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [currentView, setCurrentView] = useState('Dashboard');
    const [accountDetails, setAccountDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const decodeToken = jwtDecode(token);

                if (!token) throw new Error('JWT not found');

                const accountId = decodeToken.accountId;
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/account/${accountId}`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': token
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch user details');

                const accountData = await response.json();
                const userData = accountData.user;

                setAccountDetails(accountData);
                setUserDetails(userData);
                setUserAttributes(userData.attributes);

            } catch (error) {
                console.error('Error fetching user details: ', error);
                navigate('/login');
            }
        };

        fetchUserDetails();

    }, [navigate]);

    const renderContent = () => {
        switch (currentView) {
            case 'Profile':
                return <Profile />;
            case 'TransactionHistory':
                return <TransactionHistory userDetails={userDetails} />;
            case 'TransferFunds':
                return <TransferFunds userDetails={userDetails} onCancel={() => setCurrentView('Dashboard')} />;
            case 'NewPayment':
                return <NewPayment userDetails={userDetails} onCancel={() => setCurrentView('Dashboard')} />;
            default:
                return (
                    <div style={{ margin: '1rem', padding: 0 }}>
                        <center>
                            <h1>Welcome, {userAttributes.first_name || ''}!</h1>
                            <p style={{ margin: '1rem', padding: 0 }}>
                                Last Login: {new Date(userDetails.last_login).toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    timeZoneName: 'short',
                                    hour12: true
                                })}
                            </p>
                            <br /><br />
                            <div>
                                <h3>Account Number</h3>
                                <p style={{margin: '0.5rem', padding: 0}}>{accountDetails.accountNumber}</p>
                            </div>
                            <br /><br />
                            <div>
                                <h3>Current Balance</h3>
                                <p style={{margin: '0.5rem', padding: 0}}>${accountDetails.balance}</p>
                            </div>
                        </center>
                    </div>
                );
        }
    };

    return (
        <div className="user-dashboard">
            <nav>
                <button onClick={() => setCurrentView('Dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentView('Profile')}>Profile</button>
                <button onClick={() => setCurrentView('TransactionHistory')}>Transaction History</button>
                <button onClick={() => setCurrentView('TransferFunds')}>Transfer Funds</button>
                <button onClick={() => setCurrentView('NewPayment')}>New Payment</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default UserDashboard;
