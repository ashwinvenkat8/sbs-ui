import React, { useEffect, useState } from 'react';
import CustomerDashboard from './Dashboard';

export function NewPayment({ isCancelled }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});
    const [merchantList, setMerchantList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrorMessage("");
    };

    useEffect(() => {
        const fetchMerchants = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const merchantsResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/merchants`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

                const merchantData = await merchantsResponse.json();
                
                if (!merchantsResponse.ok) throw new Error('Failed to fetch merchants');

                setMerchantList(merchantData);

            } catch (error) {
                console.error('Error fetching merchants:', error);
            }
        };

        fetchMerchants();
    
    }, []);

    const handlePayment = async () => {
        const token = localStorage.getItem('authToken');
        
        if (!formData.amount) {
            setErrorMessage('Please enter an amount.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/pay/${formData.merchant}`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                }),
            });

            if (!response.ok) throw new Error('Payment failed');

            alert(`Payment succeeded`);
            
            return <CustomerDashboard />;

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
                {merchantList > 0 ? (
                    <><table>
                        <tbody>
                            <tr>
                                <th>Merchant</th>
                                <td>
                                    {merchantList > 0 && (
                                        <select
                                            name="merchant"
                                            value={formData.merchant}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Merchant</option>
                                            {merchantList.map((merchant) => (
                                                <option key={merchant.attributes.payment_id} value={merchant.attributes.payment_id}>
                                                    {merchant.attributes.business_name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
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
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
                    <br />
                    <button className='confirm-pay' onClick={handlePayment}>Pay</button>
                    <button className='cancel-pay' onClick={isCancelled}>Cancel</button></>
                ) : (
                    <p>There are no merchants registered with this bank</p>
                )}
            </center>
        </div>
    );
}
