// Authorizing High value transactions
import React, { useEffect, useState } from 'react';

const AuthorizeTransactions = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch(''); // API to fettch the authorizing transactions
            if (!response.ok) {
                throw new Error('Failed to fetch deletion requests');
            }
            const data = await response.json();
            setRequests(data);
        };

        fetchRequests().catch(error => console.error('Error:', error));
    }, []);

    const handleRequest = async (requestId, isApprove) => {
        const endpoint = isApprove ? `/api/deletion-requests/${requestId}/approve` : `/api/deletion-requests/${requestId}/deny`;
        const response = await fetch(endpoint, {
            method: 'POST',
        });
        if (response.ok) {
            alert(`Request ${isApprove ? 'approved' : 'denied'} successfully.`);
            // Optionally, remove the handled request from the list
            setRequests(prev => prev.filter(request => request.requestId !== requestId));
        } else {
            console.error('Failed to process the request');
        }
    };

    return (
        <div>
            <h2> Transactions to approve</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.requestId}>
                        User ID: {request.userId} 
                        amount :{request.amount}{/* Implement fetching and displaying user's name based on this ID */}
                        <button onClick={() => handleRequest(request.requestId, true)}>Approve</button>
                        <button onClick={() => handleRequest(request.requestId, false)}>Deny</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorizeTransactions;
