import React, { useEffect, useState } from 'react';
import LogoutButton from './components/LogoutButton'; // Make sure the path is correct for your project structure
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchUsers = async () => {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/api/v1/users');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Network response was not ok.');
    };

    const toggleUserDetail = (userId) => {
        setSelectedUserId(selectedUserId === userId ? null : userId);
    };

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>System Admin Dashboard</h1>
            <LogoutButton />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <React.Fragment key={user.id}>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => toggleUserDetail(user.id)}>View</button>
                                </td>
                            </tr>
                            {selectedUserId === user.id && (
                                <tr className="detail-view">
                                    <td colSpan="3">
                                        <div>
                                            <h3>Profile Details</h3>
                                            <p>First Name: {user.profile.first_name}</p>
                                            <p>Middle Name: {user.profile.middle_name}</p>
                                            <p>Last Name: {user.profile.last_name}</p>
                                            <p>Date of Birth: {user.profile.date_of_birth}</p>
                                            <p>Gender: {user.profile.gender}</p>
                                            <p>SSN: {user.profile.ssn}</p>
                                            <p>Address: {user.profile.address}</p>
                                            <p>Phone Number: {user.profile.phone_number}</p>
                                            <h3>Account Details</h3>
                                            <p>Account Number: {user.account.accountNumber}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
