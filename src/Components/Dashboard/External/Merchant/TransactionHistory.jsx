import React, { useState, useEffect } from 'react';

export function TransactionHistory({ token }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${token}`, {
                    headers: { 'Authorization': token }
                });
                if (!response.ok) throw new Error('Failed to fetch transactions');
                const data = await response.json();
                setTransactions(data.transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [token]);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} style={{ color: transaction.type === 'CREDIT' ? 'green' : 'red' }}>
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
