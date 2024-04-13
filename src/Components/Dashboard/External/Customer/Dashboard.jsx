import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Profile } from './Profile';
import { TransferFunds } from './TransferFunds';
import { TransactionHistory } from './TransactionHistory';
import { useAuth } from '../../../Auth/AuthProvider';
import { NewPayment } from './NewPayment';
import '../External.css';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [currentView, setCurrentView] = useState('Dashboard');
    const [accountDetails, setAccountDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});

    useEffect(() => {
        // const fetchPendingReviews = async() => {
        //     const token = localStorage.getItem('authToken');
        //     const decodedToken = jwtDecode(token);

        //     if (!token) throw new Error('JWT not found');

        //     const filter = ``;

        //     const paymentReviewsResponse = await fetch(`${process.env.REACT_APP_API_URL}/review/filter?${filter}`, {
        //         method: 'GET',
        //         headers: { 
        //             'Authorization': token
        //         }
        //     });

        //     if (!paymentReviewsResponse.ok) throw new Error('Failed to fetch user details');
        // };
        
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const decodedToken = jwtDecode(token);

                if (!token) throw new Error('JWT not found');

                const accountId = decodedToken.accountId;
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
        // fetchPendingReviews();

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
            case 'TransferFunds':
                return <TransferFunds isCancelled={() => setCurrentView('Dashboard')} isCompleted={() => setCurrentView('TransactionHistory')}/>;
            case 'NewPayment':
                return <NewPayment userDetails={userDetails} isCancelled={() => setCurrentView('Dashboard')} />;
            default:
                return (
                    <div className='welcome-message'>
                        <center>
                            <h1>{welcomeMessage}</h1>
                            <p className='welcome-message'>
                                Last Login: {lastLogin}
                            </p>
                            <br />
                            <div className='account-overview'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><h3>Account Number</h3></th>
                                            <th><h3>Current Balance</h3></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><p className='user-details'>{accountDetails.accountNumber}</p></td>
                                            <td><p className='user-details'>${accountDetails.balance}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br /><hr /><br /><br />
                            <div className='pending-reviews'>
                                <h2>Pending Reviews</h2>
                                <br />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>From</th>
                                            <th>Review Item</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </center>
                    </div>
                );
        }
    };

    return (
        <div className="customer-dashboard">
            <nav>
                <button onClick={() => setCurrentView('Dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentView('Profile')}>Profile</button>
                <button onClick={() => setCurrentView('TransactionHistory')}>Transaction History</button>
                <button onClick={() => setCurrentView('TransferFunds')}>Transfer Funds</button>
                <button onClick={() => setCurrentView('NewPayment')}>New Payment</button>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default CustomerDashboard;
