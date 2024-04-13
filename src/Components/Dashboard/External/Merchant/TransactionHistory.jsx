import React, { useState, useEffect } from "react";

export function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("authToken");

                if (!token) {
                    console.error("No auth token available");
                    return;
                }

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/transaction/myTxns`,
                    {
                        method: "GET",
                        headers: { Authorization: token },
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch transactions");

                const data = await response.json();

                setTransactions(data.transactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.type}</td>
                                <td>{transaction.from}</td>
                                <td>{transaction.to}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <p>No transactions found</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}
