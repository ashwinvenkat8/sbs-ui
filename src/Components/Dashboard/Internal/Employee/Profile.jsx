import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";

export default function EmployeeProfile() {
  
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            const authToken = localStorage.getItem("authToken");
            const decodedToken = jwtDecode(authToken);

            try {
                const profileResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/profile/${decodedToken.userId}`,
                    {
                        headers: { 
                          Authorization: authToken 
                        },
                    }
                );
                if (!profileResponse.ok)
                    throw new Error("Failed to fetch user details");

                const profileData = await profileResponse.json();
                
                setUserDetails(profileData);
                setUserAttributes(profileData.attributes);

            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <div className="profile">
            <center>
                <h2>User Profile</h2>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{userDetails.username}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{userDetails.email}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{userAttributes.first_name}</td>
                        </tr>
                        <tr>
                            <th>Middle Name</th>
                            <td>{userAttributes.middle_name || "-"}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{userAttributes.last_name}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>{userAttributes.date_of_birth}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{userAttributes.gender}</td>
                        </tr>
                        <tr>
                            <th>SSN</th>
                            <td>{userAttributes.ssn}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{userAttributes.address}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>{userAttributes.phone_number}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{userDetails.role}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </center>
        </div>
        // <div>
        //   <h2>Admin Profile</h2>
        //   {!editMode ? (
        //     <div>
        //       {/* Display all user details */}
        //       <p>Username: {userDetails.username}</p>
        //       <p>Email: {userDetails.email}</p>
        //       <p>First Name: {userDetails.first_name}</p>
        //       <p>Middle Name: {userDetails.middle_name}</p>
        //       <p>Last Name: {userDetails.last_name}</p>
        //       <p>Date of Birth: {userDetails.date_of_birth}</p>
        //       <p>Gender: {userDetails.gender}</p>
        //       <p>SSN: {userDetails.ssn}</p>
        //       <p>Address: {userDetails.address}</p>
        //       <p>Phone Number: {userDetails.phone_number}</p>
        //       <p>Role: {userDetails.role}</p>
        //       {/* Assuming accountNumber is part of userDetails */}
        //       <p>Account Number: {userDetails.accountNumber}</p>
        //       <button onClick={() => setEditMode(true)}>Edit</button>
        //     </div>
        //   ) : (
        //     <div>
        //       <h2>Edit Profile</h2>
        //       {/* Editable fields */}
        //       <label>Address:</label>
        //       <input
        //         type="text"
        //         value={updatedAddress}
        //         onChange={(e) => setUpdatedAddress(e.target.value)}
        //       />
        //       <label>Phone Number:</label>
        //       <input
        //         type="text"
        //         value={updatedPhoneNumber}
        //         onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
        //       />
        //       <button onClick={handleUpdateDetails}>Save</button>
        //       <button onClick={() => setEditMode(false)}>Cancel</button>
        //     </div>
        //   )}
        // </div>
    );
}
