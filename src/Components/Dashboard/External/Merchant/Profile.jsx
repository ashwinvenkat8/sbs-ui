import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function Profile({ token }) {
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});
    const [accountDetails, setAccountDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
    const [userId, setUserId] = useState(null);
    const [accountId, setaccountId] =useState(null);
   
    // const { userId, userRole } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const decodeToken = jwtDecode(token);
                const accountId = decodeToken.accountId;
                
                setUserId(decodeToken.userId);
                setaccountId(accountId);
                
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/account/' + `${accountId}`, {
                    headers: { 'Authorization': `${token}` }
                });
                
                if (!response.ok) throw new Error('Failed to fetch user details');
                
                const data = await response.json();
                
                setAccountDetails(data);
                setUserDetails(data.user);
                setUserAttributes(data.user.attributes);
                setUpdatedAddress(data.address);
                setUpdatedPhoneNumber(data.phone_number);
            
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [token]); // Dependency array with token to re-fetch if the token changes

    const handleUpdateDetails = async () => {
        
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/profile/' + `${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributes: {
                        address: updatedAddress,
                        phone_number: updatedPhoneNumber
                    }
                }),
            });
            if (!response.ok) throw new Error('Failed to update user details');
            alert('User details updated successfully!');
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {!editMode ? (
                <div>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Name: {userAttributes.business_name}</p>
                    <p>Date of Birth: {userAttributes.owner_dob}</p>
                    <p>Gender: {userAttributes.owner_gender}</p>
                    <p>EIN: {userAttributes.ein}</p>
                    <p>SSN: {userAttributes.owner_ssn}</p>
                    <p>Address: {userAttributes.address}</p>
                    <p>Phone Number: {userAttributes.business_phone}</p>
                    <p>Role: {userDetails.role}</p>
                    <p>Account Number: {accountDetails.accountNumber}</p> 
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            ) : (
                <div>
                    <h2>Edit Profile</h2>
                    <label>Address:</label>
                    <input type="text" value={updatedAddress} onChange={e => setUpdatedAddress(e.target.value)} />
                    <label>Phone Number:</label>
                    <input type="number" value={updatedPhoneNumber} onChange={e => setUpdatedPhoneNumber(e.target.value)} />
                    <button onClick={handleUpdateDetails}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
