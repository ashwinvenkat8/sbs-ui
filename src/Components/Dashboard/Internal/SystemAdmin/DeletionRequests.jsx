import React, { useEffect, useState } from 'react';

const DeletionRequest = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch(''); // Path to fetch the list of user requests
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
            <h2>Deletion Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.requestId}>
                        User ID: {request.userId} {/* Implement fetching and displaying user's name based on this ID */}
                        <button onClick={() => handleRequest(request.requestId, true)}>Approve</button>
                        <button onClick={() => handleRequest(request.requestId, false)}>Deny</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeletionRequest;
