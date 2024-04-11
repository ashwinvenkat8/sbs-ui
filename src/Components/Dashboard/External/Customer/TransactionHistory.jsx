import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No auth token available');
                    return;
                }
                const decodedToken = jwtDecode(token);
                const accountId = decodedToken.accountId;

                const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/myTxns/${accountId}`, {
                    headers: { 'Authorization': token }
                });
                

                if (!response.ok) {
                    throw new Error('Failed to fetch transaction history');
                }

                const data = await response.json();
                setTransactions(data.transactions);
                console.log(data)
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <li key={index}>
                            From: {transaction.from} - To: {transaction.to} - Amount: {transaction.amount}
                        </li>
                    ))
                ) : (
                    <p>No transactions found.</p>
                )}
            </ul>
        </div>
    );
}

