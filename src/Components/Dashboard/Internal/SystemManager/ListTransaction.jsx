import React, { useState, useEffect } from 'react';

const ListTransactions = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // Function to fetch all transactions
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/all`, {
                    headers: { 'Authorization': token }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, [token]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/${userId}`, {
                headers: { 'Authorization': token }
            });
            if (response.ok) {
                setSelectedUserDetails(await response.json());
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
            
        </div>
    );
};

export default ListTransactions;
