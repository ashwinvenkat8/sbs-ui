// AddFunds.jsx
import React, { useState } from 'react';

export function NewPayment({ token, onCancel, onFundsAdded }) {
    const [amount, setAmount] = useState('');

    const handleAddFunds = async () => {
        if (!amount) {
            alert('Please enter an amount.');
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/user/addfunds', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                }),
            });

            if (!response.ok) throw new Error('Failed to add funds');
            const result = await response.json();
            alert(`Funds added successfully! New balance: ${result.newBalance}`);
            onFundsAdded(result.newBalance);
            setAmount('');
        } catch (error) {
            console.error('Error adding funds:', error);
            alert('Error adding funds. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Funds</h2>
            <div>
                <label>Enter amount to be added:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
            </div>
            <button onClick={handleAddFunds}>Add</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
