// AddFunds.jsx
import React, { useState } from 'react';

export function Payments({ token, onCancel, onFundsAdded }) {
    const [amount, setAmount] = useState('');

    const handleAddFunds = async () => {
        if (!amount) {
            alert('Please enter an amount.');
            return;
        }

        try {
            const response = await fetch(process.env.API_URL + '/api/v1/user/addfunds', { // Your API endpoint to add funds
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Assuming your API expects an amount and uses the user info from the token
                    amount: parseFloat(amount),
                }),
            });

            if (!response.ok) throw new Error('Failed to add funds');
            const result = await response.json();
            alert(`Funds added successfully! New balance: ${result.newBalance}`);
            onFundsAdded(result.newBalance); // Callback to update the balance in the parent component
            setAmount(''); // Reset amount
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
