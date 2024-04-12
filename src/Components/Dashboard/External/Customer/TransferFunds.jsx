import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function TransferFunds({ token, onCancel }) {
    // const [recipientName, setRecipientName] = useState('');
    const [accountNumber, setAccountNumber] = useState(Number);
    const [amount, setAmount] = useState(Number);
    // const [accountDetails, setAccountDetails] = useState({});

    const handleTransfer = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const decodeToken = jwtDecode(token);

            const accountId = decodeToken.accountId;

            const accountResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/account/${accountId}`, {
                headers: { 'Authorization': token }
            });
            if (!accountResponse.ok) throw new Error('Failed to fetch user details');
            
            const data = await accountResponse.json();
            
            const fromAccountNumber = data.accountNumber;
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/new`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: fromAccountNumber,
                    to: accountNumber,
                    amount,
                }),
            });
            if (!response.ok) throw new Error('Failed to transfer funds');
            const responseJson = await response.json();
            alert(responseJson.message);
            // Clear form or handle success
        } catch (error) {
            console.error('Error transferring funds:', error);
            alert('Error transferring funds. Please try again.');
        }
    };

    return (
        <div>
            <h2>Transfer Funds</h2>

            <div>
                <label>Account Number:</label>
                <input
                    type="number"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    placeholder="Enter recipient's account number"
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Enter amount to transfer"
                />
            </div>
            <button onClick={handleTransfer}>Send</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
