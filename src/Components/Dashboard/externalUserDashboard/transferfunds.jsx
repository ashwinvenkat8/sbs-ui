import React, { useState } from 'react';

export function TransferFunds({ token, onCancel }) {
    const [recipientName, setRecipientName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async () => {
        try {
            // Assuming you have an API endpoint to handle fund transfers
            const response = await fetch('http://127.0.0.1:8080/api/v1/transfer', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipientName,
                    accountNumber,
                    amount,
                }),
            });
            if (!response.ok) throw new Error('Failed to transfer funds');
            alert('Funds transferred successfully!');
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
                <label>Recipient Name:</label>
                <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="Enter recipient's name"
                />
            </div>
            <div>
                <label>Account Number:</label>
                <input
                    type="text"
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
