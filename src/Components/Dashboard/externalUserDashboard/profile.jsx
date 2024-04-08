import React, { useState, useEffect } from 'react';

export function Profile({ token }) {
    const [userDetails, setUserDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/profile/YOUR_USER_ID', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch user details');
                const data = await response.json();
                setUserDetails(data);
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
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/profile/YOUR_USER_ID', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: updatedAddress,
                    phone_number: updatedPhoneNumber,
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
                    <p>First Name: {userDetails.first_name}</p>
                    <p>Middle Name: {userDetails.middle_name}</p>
                    <p>Last Name: {userDetails.last_name}</p>
                    <p>Date of Birth: {userDetails.date_of_birth}</p>
                    <p>Gender: {userDetails.gender}</p>
                    <p>SSN: {userDetails.ssn}</p>
                    <p>Address: {userDetails.address}</p>
                    <p>Phone Number: {userDetails.phone_number}</p>
                    <p>Role: {userDetails.role}</p>
                    {/* Assuming accountNumber is part of userDetails */}
                    <p>Account Number: {userDetails.accountNumber}</p> 
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            ) : (
                <div>
                    <h2>Edit Profile</h2>
                    {/* Editable fields */}
                    <label>Address:</label>
                    <input type="text" value={updatedAddress} onChange={e => setUpdatedAddress(e.target.value)} />
                    <label>Phone Number:</label>
                    <input type="text" value={updatedPhoneNumber} onChange={e => setUpdatedPhoneNumber(e.target.value)} />
                    <button onClick={handleUpdateDetails}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
