import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Profile } from './Profile';
import { TransferFunds } from './TransferFunds';
import { TransactionHistory } from './TransactionHistory';
import { useAuth } from '../../../Auth/AuthProvider';
import { NewPayment } from './NewPayment';
import '../External.css';

const getParsedReviews = (reviews, userId) => {
    const parsedReviews = [];

    reviews.forEach((review) => {
        if(review.reviewObject !== userId || review.createdBy !== userId) {
            return;
        }

        const firstName = review.createdBy.user?.attributes.first_name || '';
        const lastName = review.createdBy.user?.attributes.last_name || '';
        const fullName = `${firstName} ${lastName}`;

        parsedReviews.push({
            id: review._id,
            type: review.type,
            name: fullName,
            reviewItem: review.reviewObject
        });
    });

    return parsedReviews;
};

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [currentView, setCurrentView] = useState('Dashboard');
    const [accountDetails, setAccountDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});
    const [pendingReviews, setPendingReviews] = useState([]);

    useEffect(() => {
        const fetchPendingReviews = async() => {
            try {
                const token = localStorage.getItem('authToken');
                const decodedToken = jwtDecode(token);

                if (!token) throw new Error('JWT not found');

                const pendingReviewsResponse = await fetch(`${process.env.REACT_APP_API_URL}/review/filter?status=PENDING APPROVAL`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': token
                    }
                });

                const reviewData = await pendingReviewsResponse.json();

                if (!pendingReviewsResponse.ok) {
                    throw new Error('Failed to fetch pending reviews');
                }

                setPendingReviews(getParsedReviews(reviewData, decodedToken.userId));
            
            } catch (error) {
                console.error('Error fetching pending reviews: ', error);
            }
        };
        
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

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

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
        fetchPendingReviews();

    }, [navigate]);

    const handleReview = async (reviewId, action) => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) throw new Error('JWT not found');

            const response = await fetch(`${process.env.REACT_APP_API_URL}/review/${action}/${reviewId}`, {
                method: 'PATCH',
                headers: { 'Authorization': token }
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} review`);
            }

            alert(`Review ${action}ed successfully`);

        } catch (error) {
            console.error(`Error ${action}ing review: ${error}`);
        }
    };

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
                return <TransactionHistory balance={accountDetails.balance} />;
            case 'TransferFunds':
                return <TransferFunds isCancelled={() => setCurrentView('Dashboard')} isCompleted={() => setCurrentView('TransactionHistory')}/>;
            case 'NewPayment':
                return <NewPayment isCancelled={() => setCurrentView('Dashboard')} isCompleted={() => setCurrentView('TransactionHistory')} />;
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
                                {pendingReviews.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>From</th>
                                                <th>Review Item</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingReviews.map((review) => (
                                                <tr key={review._id}>
                                                    <td>{review.type}</td>
                                                    <td>{review.name}</td>
                                                    <td>{review.reviewItem}</td>
                                                    <td>
                                                        {review.type !== 'HIGH VALUE TXN' && (
                                                            <><button onClick={() => handleReview(review.id, 'authorize')}>Approve</button>
                                                            <button onClick={() => handleReview(review.id, 'reject')}>Reject</button></>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No pending reviews found</p>
                                )}
                            </div>
                        </center>
                    </div>
                );
        }
    };

    return (
        <div className="external-dashboard">
            <h2>Customer</h2>
            <br />
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
