import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from './Profile';
import { jwtDecode } from "jwt-decode";
import { TransactionHistory } from './TransactionHistory';
import { RequestPayments } from './RequestPayments';
import { useAuth } from '../../../Auth/AuthProvider';


const MerchantDashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [currentView, setCurrentView] = useState('welcome');
    const [accountDetails, setAccountDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const decodeToken = jwtDecode(token);
                if (!token) throw new Error('No token found');
                
                const userId = decodeToken.userId;
                const accountId = decodeToken.accountId;
                
                
                
                // Assuming the backend endpoint `/user/details` expects a GET request
                const response = await fetch(`${process.env.API_URL}/user/account/${accountId}`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': `${token}`
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch user details');
                const account_data = await response.json();
                const user_data = account_data.user;
                setAccountDetails(account_data);
                setUserDetails(user_data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                navigate('/login'); // Redirect to login if fetching user details fails
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const renderContent = () => {
        //const balance = userDetails.balance['$numberDecimal'];
        console.log(userDetails.user)
        
        switch (currentView) {
            case 'profile':
                return <Profile />;
            case 'transactionHistory':
                return <TransactionHistory userDetails={userDetails} />;
            case 'requestpayments':
                return <RequestPayments userDetails={userDetails} onCancel={() => setCurrentView('dashboard')} />;
            case 'payments':
                return <payments userDetails={userDetails} onCancel={() => setCurrentView('welcome')} />;
            default:
                return (
                    <div>
                        <h2>Welcome, {userDetails.username || 'User'}!</h2>
                        <p>Current Balance:{accountDetails.balance}</p>
                        {/* Display other user details as needed */}
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
                <button onClick={() => setCurrentView('requestpayments')}>Request payments</button>
                <button onClick={() => setCurrentView('reviewrequests')}>Review requests</button>
                {/* <button onClick={() => setCurrentView('addFunds')}>Review Requests</button> */}
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default MerchantDashboard;

