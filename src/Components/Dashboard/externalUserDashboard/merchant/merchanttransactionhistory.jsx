import React, { useState, useEffect } from 'react';

export function TransactionHistory({ token }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/v1/transaction/${token}', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch transactions');
                const data = await response.json();
                setTransactions(data.transactions); // Assuming the API returns an array of transactions
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [token]); // Re-fetch if the token changes

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} style={{ color: transaction.type === 'credit' ? 'green' : 'red' }}>
                        <p>Date: {transaction.date}</p>
                        <p>Type: {transaction.type}</p>
                        <p>Amount: ${transaction.amount}</p>
                        <p>Description: {transaction.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
