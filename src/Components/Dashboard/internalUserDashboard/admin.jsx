

// import React, { useEffect, useState } from 'react';
// import LogoutButton from '../../logout'; // Adjust the import path as needed
// import './admin.css';

// const AdminDashboard = () => {
//     const [accountHolders, setAccountHolders] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState(null);

//     const fetchAccountHolders = async () => {
//         try {
//             const token = localStorage.getItem('authToken'); // or sessionStorage.getItem('authToken')
//             const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/account/all', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setAccountHolders(data);
//             } else {
//                 throw new Error('Network response was not ok.');
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     };
    

//     useEffect(() => {
//         fetchAccountHolders();
//     }, []);

//     const toggleUserDetail = (userId) => {
//         setSelectedUserId(selectedUserId === userId ? null : userId);
//     };

//     return (
//         <div className="admin-dashboard">
//             <h1>System Admin Dashboard</h1>
//             <LogoutButton />
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Account Number</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {accountHolders.map(({ user, accountNumber }) => (
//                         <React.Fragment key={user._id}>
//                             <tr>
//                                 <td>{user.attributes.first_name}</td>
//                                 <td>{user.attributes.last_name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{accountNumber}</td>
//                                 <td>
//                                     <button onClick={() => toggleUserDetail(user._id)}>View</button>
//                                 </td>
//                             </tr>
//                             {selectedUserId === user._id && (
//                                 <tr className="detail-view">
//                                     <td colSpan="5">
//                                         <div>
//                                             <h3>Profile Details</h3>
//                                             <p>First Name: {user.attributes.first_name}</p>
//                                             <p>Middle Name: {user.attributes.middle_name}</p>
//                                             <p>Last Name: {user.attributes.last_name}</p>
//                                             <p>Date of Birth: {user.attributes.date_of_birth}</p>
//                                             <p>Gender: {user.attributes.gender}</p>
//                                             <p>SSN: {user.attributes.ssn}</p>
//                                             <p>Address: {user.attributes.address}</p>
//                                             <p>Phone Number: {user.attributes.phone_number}</p>
//                                             <h3>Account Details</h3>
//                                             <p>Account Number: {accountNumber}</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import LogoutButton from '../../logout';
import './admin.css'; // Ensure correct path

// Sub-components for different admin views
import AdminProfile from './adminProfile';
import ListUsers from './listUsers';
import AuthorizeTransactions from './authorize';

const AdminDashboard = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'profile':
                return <AdminProfile token={localStorage.getItem('authToken')} />;
            case 'listUsers':
                return <ListUsers token={localStorage.getItem('authToken')} />;
            case 'authorizeTransactions':
                return <AuthorizeTransactions token={localStorage.getItem('authToken')} />;
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
                <button onClick={() => setCurrentView('authorizeTransactions')}>Authorize Transactions</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            {renderContent()}
        </div>
    );
};

export default AdminDashboard;




