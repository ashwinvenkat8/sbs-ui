import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export function TransferFunds({ token, onCancel }) {
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState(Number);
    const [amount, setAmount] = useState(Number);

    const handleTransfer = async () => {
        try  {
            const token = localStorage.getItem('authToken');
            const decodeToken = jwtDecode(token);

            const accountId = decodeToken.accountId;

            const accountResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/account/${accountId}`, {
                headers: { 'Authorization': token }
            });
            if (!accountResponse.ok) throw new Error('Failed to fetch user details');
            
            const data = await accountResponse.json();
            
            const senderAccountNumber = data.accountNumber;
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/new`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: senderAccountNumber,
                    to: accountNumber,
                    amount,
                }),
            });
            
            if (!response.ok) throw new Error('Failed to transfer funds');
            const responseJson = await response.json();
            
            alert(responseJson.message);
            navigate('/customer/dashboard');
        
        } catch (error) {
            console.error('Error transferring funds:', error);
            alert('Error transferring funds. Please try again.');
        }
    };

    return (
        <div className='transfer-funds'>
            <h2>Transfer Funds</h2>
            <br />
            <center>
                <table>
                    <tr>
                        <th>Account Number</th>
                        <td>
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={e => setAccountNumber(e.target.value)}
                                placeholder="Enter recipient's account number"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="Enter amount to transfer"
                            />
                        </td>
                    </tr>
                </table>
                <br />
                <button className='send-funds' onClick={handleTransfer}>Send</button>
                <button className='cancel-transfer' onClick={onCancel}>Cancel</button>
            </center>
        </div>
    );
}
