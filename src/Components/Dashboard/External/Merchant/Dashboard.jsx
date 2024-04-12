import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Profile } from './Profile';
import { TransactionHistory } from './TransactionHistory';
import { RequestPayments } from './RequestPayments';
import { ReviewRequests } from './ReviewRequests';
import { useAuth } from '../../../Auth/AuthProvider';
import '../External.css';

const MerchantDashboard = () => {
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
                console.error('Error fetching user details:', error);
                navigate('/login');
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const renderContent = () => {
        const welcomeMessage = userAttributes.first_name ? `Welcome, ${userAttributes.first_name}`: 'Welcome';
        const lastLogin = new Date(userDetails.last_login).toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', timeZoneName: 'short', hour12: true
        });

        switch (currentView) {
            case 'Profile':
                return <Profile />;
            case 'TransactionHistory':
                return <TransactionHistory userDetails={userDetails} />;
            case 'RequestPayments':
                return <RequestPayments userDetails={userDetails} onCancel={() => setCurrentView('Dashboard')} />;
            case 'ReviewRequests':
                return <ReviewRequests userDetails={userDetails} onCancel={() => setCurrentView('ReviewRequests')} />;
            default:
                return (
                    <div className='welcome-message'>
                        <center>
                            <h1>{welcomeMessage}</h1>
                            <p className='welcome-message'>
                                Last Login: {lastLogin}
                            </p>
                            <br /><br />
                            <div>
                                <h3>Account Number</h3>
                                <p className='user-details'>{accountDetails.accountNumber}</p>
                            </div>
                            <br /><br />
                            <div>
                                <h3>Current Balance</h3>
                                <p className='user-details'>${accountDetails.balance}</p>
                            </div>
                        </center>
                    </div>
                );
        }
    };

    return (
        <div className="user-dashboard">
            <nav>
                <button onClick={() => setCurrentView('Dashboard')}>Home</button>
                <button onClick={() => setCurrentView('Profile')}>Profile</button>
                <button onClick={() => setCurrentView('TransactionHistory')}>Transaction History</button>
                <button onClick={() => setCurrentView('RequestPayments')}>Request Payments</button>
                <button onClick={() => setCurrentView('ReviewRequests')}>Review Requests</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default MerchantDashboard;

