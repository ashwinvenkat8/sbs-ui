import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function Profile({ token }) {
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});
    const [accountDetails, setAccountDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
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
                // console.log(decodeToken.userId)
                // console.log(userId)
                const response = await fetch(process.env.API_URL + '/user/account/' + `${accountId}`, {
                    headers: { 'Authorization': `${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch user details');
                const data = await response.json();
                console.log(data);
                setAccountDetails(data);
                setUserDetails(data.user);
                setUserAttributes(data.user.attributes);
                setUpdatedAddress(data.address);
                setUpdatedPhoneNumber(data.phone_number);
                setUpdateEmail(data.email)
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [token]); // Dependency array with token to re-fetch if the token changes

    const handleUpdateDetails = async () => {
        
        try {
            const response = await fetch(process.env.API_URL + '/user/profile/' + `${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributes: {
                        address: updatedAddress,
                        phone_number: updatedPhoneNumber,
                        email: updateEmail

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
                    {/* Display all user details */}
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userAttributes.first_name}</p>
                    <p>Middle Name: {userAttributes.middle_name}</p>
                    <p>Last Name: {userAttributes.last_name}</p>
                    <p>Date of Birth: {userAttributes.date_of_birth}</p>
                    <p>Gender: {userAttributes.gender}</p>
                    <p>SSN: {userAttributes.ssn}</p>
                    <p>Address: {userAttributes.address}</p>
                    <p>Phone Number: {userAttributes.phone_number}</p>
                    <p>Role: {userDetails.role}</p>
                    {/* Assuming accountNumber is part of userDetails */}
                    <p>Account Number: {accountDetails.accountNumber}</p> 
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            ) : (
                <div>
                    <h2>Edit Profile</h2>
                    {/* Editable fields */}
                    <label>Address:</label>
                    <input type="text" value={updatedAddress} onChange={e => setUpdatedAddress(e.target.value)} />
                    <label>Phone Number:</label>
                    <input type="number" value={updatedPhoneNumber} onChange={e => setUpdatedPhoneNumber(e.target.value)} />
                    <label>Email:</label>
                    <input type="text" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} />
                    <button onClick={handleUpdateDetails}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
