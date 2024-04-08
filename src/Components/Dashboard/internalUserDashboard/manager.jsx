import React, { useState, useEffect } from 'react';
import './manager.css';

const ManagerDashboard = () => {
    const [criticalTransactions, setCriticalTransactions] = useState([]);

    useEffect(() => {
        // Fetch critical transactions from your API
        fetch(process.env.REACT_APP_BACKEND_URL+'/api/v1/transactions/critical') // Adjust the API endpoint as needed
            .then(response => response.json())
            .then(data => setCriticalTransactions(data))
            .catch(error => console.error('Error fetching critical transactions:', error));
    }, []);

    const handleTransactionDecision = (transactionId, decision) => {
        console.log(`Transaction ${transactionId} ${decision}`);
        // Implement the logic to approve or deny the transaction
    };

    return (
        <div className="manager-dashboard">
            <h1>System Manager Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>User/Merchant</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {criticalTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.user}</td>
                            <td>${transaction.amount}</td>
                            <td>
                                <button onClick={() => handleTransactionDecision(transaction.id, 'approved')}>Approve</button>
                                <button onClick={() => handleTransactionDecision(transaction.id, 'denied')}>Deny</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerDashboard;
