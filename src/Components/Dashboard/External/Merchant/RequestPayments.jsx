import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function RequestPayments({ token, onCancel }) {
    // const [recipientName, setRecipientName] = useState('');
    const [accountNumber, setAccountNumber] = useState(Number);
    const [amount, setAmount] = useState(Number);
    // const [accountDetails, setAccountDetails] = useState({});

    const handleTransfer = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const decodeToken = jwtDecode(token);

            const accountId = decodeToken.accountId;

            const accountResponse = await fetch(process.env.API_URL + '/user/account/' + `${accountId}`, {
                headers: { 'Authorization': `${token}` }
            });
            if (!accountResponse.ok) throw new Error('Failed to fetch user details');
            
            const data = await accountResponse.json();
            
            const fromAccountNumber = data.accountNumber;
            
            // Assuming you have an API endpoint to handle fund transfers
            const response = await fetch(process.env.API_URL + '/transaction/pay/request', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountNumber,
                    amount,
                }),
            });
            if (!response.ok) throw new Error('Failed to request funds');
            const responseJson = await response.json();
            alert(responseJson.message);
            // Clear form or handle success
        } catch (error) {
            //console.error('Error transferring funds:', error);
            alert(error);
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
                    placeholder="Enter amount to request"
                />
            </div>
            <button onClick={handleTransfer}>Request</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
