import React, { useState, useEffect } from 'react';
import Popup from './userpopup';// Assuming you have this component from previous steps

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

    useEffect(() => {
        // Function to fetch all users
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/v1/user/account/all', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setUsers(data); // Assuming the response is the array of users
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, [token]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/v1/user/account/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const userDetails = await response.json();
                setSelectedUserDetails(userDetails);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div>
            <h2>All Users</h2>
            {users.map((user) => (
                <div key={user._id} onClick={() => fetchUserDetails(user._id)} style={{ cursor: 'pointer' }}>
                    {user.name} ({user.username})
                </div>
            ))}
            {selectedUserDetails && (
                <Popup user={selectedUserDetails} onClose={() => setSelectedUserDetails(null)} />
            )}
        </div>
    );
};

export default ListUsers;
