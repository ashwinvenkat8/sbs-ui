import React, { useState } from 'react';

export function NewPayment({ token, onCancel, onFundsAdded }) {
    const [amount, setAmount] = useState('');

    const handleAddFunds = async () => {
        if (!amount) {
            alert('Please enter an amount.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/transaction/pay/`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                }),
            });

            if (!response.ok) throw new Error('Payment failed');
            const result = await response.json();

            alert(`Payment succeeded! Current balance: ${result.newBalance}`);

            onFundsAdded(result.newBalance);
            setAmount('');

        } catch (error) {
            console.error('Error during payment:', error);
            alert('Error during payment. Please try again.');
        }
    };

    return (
        <div className='new-payment'>
            <h2>New Payment</h2>
            <br /><br />
            <center>
                <table>
                    <tbody>
                        <tr>
                            <th>Amount</th>
                            <td>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br /><br />
                <button className='confirm-pay' onClick={handleAddFunds}>Pay</button>
                <button className='cancel-pay' onClick={onCancel}>Cancel</button>
            </center>
        </div>
    );
}
