import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RequestPayments({ isCancelled }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrorMessage("");
    };

    const handleRequest = async () => {
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/pay/request`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountNumber: formData.accountNumber,
                    amount: formData.amount
                }),
            });
            
            const responseJson = await response.json();
            
            if (!response.ok) throw new Error('Failed to request payment');
            
            alert(responseJson.message);
            navigate('/merchant/dashboard');
        
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div className="transfer-funds">
            <center>
                <h2>Request Payment</h2>
                <br /><br />
                <table>
                    <tbody>
                        <tr>
                            <th>Account Number</th>
                            <td>
                                <input
                                    name="accountNumber"
                                    type="number"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    placeholder="Recipient AC No."
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>
                                <input
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
                <br />
                <button className="send-funds" onClick={handleRequest}>Send</button>
                <button className="cancel-transfer" onClick={isCancelled}>Cancel</button>
            </center>
        </div>
    );
}
