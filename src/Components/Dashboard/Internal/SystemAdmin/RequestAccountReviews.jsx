import React, { useEffect, useState } from 'react';

const RequestReviews = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('');// api to fetch usr lists
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRequestView = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}/request-view`, {       //api to request review
                method: 'POST', // Assuming it's a POST request. Adjust accordingly.
                // Include headers if needed, like Authorization header for JWT tokens
            });
            if (!response.ok) {
                throw new Error('Failed to send view request');
            }
            alert(`Request sent for user ID: ${userId}`);
            // Optionally, update the UI to reflect that the request has been sent
        } catch (error) {
            console.error('Error sending view request:', error);
        }
    };

    return (
        <div>
            <h2>Requested Account Reviews</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.username}
                        <button onClick={() => handleRequestView(user.userId)}>Request</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RequestReviews;
