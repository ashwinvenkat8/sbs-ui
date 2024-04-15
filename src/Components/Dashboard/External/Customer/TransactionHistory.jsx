import React, { useState, useEffect } from 'react';

const getParsedTxns = (transactions) => {
    const parsedTxns = [];

    transactions.forEach((transaction) => {
        const fromFirstName = transaction.from.user?.attributes.first_name || '';
        const fromLastName = transaction.from.user?.attributes.last_name || '';
        const fromACNo = (fromFirstName || fromLastName) ? `(${transaction.from.accountNumber})` : transaction.from.accountNumber;
        const toFirstName = transaction.to.user?.attributes.first_name || '';
        const toLastName = transaction.to.user?.attributes.last_name || '';
        const toACNo = (toFirstName || toLastName) ? `(${transaction.to.accountNumber})` : transaction.to.accountNumber;

        parsedTxns.push({
            type: transaction.type,
            amount: transaction.amount,
            from: `${fromFirstName} ${fromLastName} ${fromACNo}`,
            to: `${toFirstName} ${toLastName} ${toACNo}`,
            status: transaction.status
        });
    });

    return parsedTxns;
};

export function TransactionHistory({ balance }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No auth token available');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/myTxns`, {
                    method: 'GET',
                    headers: { 'Authorization': token }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch transaction history");
                }

                const data = await response.json();
                setTransactions(getParsedTxns(data.transactions));

            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <center>
            <div className='transaction-history'>
                <h2>Transaction History</h2>
                <br />
                <div>
                    <p><span className='balance'>Current Balance:</span> ${balance}</p>
                </div>
                <br />
                {transactions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.from}</td>
                                    <td>{transaction.to}</td>
                                    <td className={transaction.type.toLowerCase()}>{transaction.amount}</td>
                                    <td>{transaction.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No transactions found</p>
                )}
            </div>
        </center>
    );
}
