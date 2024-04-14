import React, { useState, useEffect } from "react";

const ListTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const fetchAllTransactions = async () => {
            try {
                const transactionsResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/transaction/all`,
                    {
                        headers: { Authorization: token },
                    }
                );

                const transactionsData = await transactionsResponse.json();

                console.log(transactionsData);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchAllTransactions();
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Review</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction._id}</td>
                            <td>
                                {transaction.from.user?.attributes?.first_name}{" "}
                                {transaction.from.user?.attributes?.last_name}
                            </td>
                            <td>
                                {transaction.to.user?.attributes?.first_name}{" "}
                                {transaction.to.user?.attributes?.last_name}
                            </td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.review}</td>
                            <td>
                                {new Date(
                                    transaction.createdAt
                                ).toLocaleString()}
                            </td>
                            <td>
                                {new Date(
                                    transaction.updatedAt
                                ).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTransactions;
