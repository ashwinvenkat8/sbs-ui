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
                <h2>Employee Profile</h2>
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
    );
}
