import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DOMPurify from "dompurify";

export function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [userAttributes, setUserAttributes] = useState({});
    const [accountDetails, setAccountDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        address: "",
        phoneNumber: "",
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                const decodedToken = jwtDecode(authToken);

                const accountResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/account/${decodedToken.accountId}`,
                    {
                        headers: { Authorization: authToken },
                    }
                );

                if (!accountResponse.ok)
                    throw new Error("Failed to fetch user details");

                const accountData = await accountResponse.json();

                setToken(authToken);
                setUserId(decodedToken.userId);
                setAccountDetails(accountData);
                setUserDetails(accountData.user);
                setUserAttributes(accountData.user.attributes);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, []);

    const submitUpdatedProfile = async () => {
        try {
            if (
                !formData.firstName &&
                !formData.middleName &&
                !formData.lastName &&
                !formData.gender &&
                !formData.address &&
                !formData.phoneNumber
            ) {
                setErrorMessage("Please fill in at least one field to update");
                return;
            }

            if (formData.firstName && !/^[a-zA-Z]+$/.test(formData.firstName)) {
                setErrorMessage("First name must consist of alphabets only");
                return;
            }

            if (
                formData.middleName &&
                !/^[a-zA-Z]+$/.test(formData.middleName)
            ) {
                setErrorMessage("Middle name must consist of alphabets only");
                return;
            }

            if (formData.lastName && !/^[a-zA-Z]+$/.test(formData.lastName)) {
                setErrorMessage("Last name must consist of alphabets only");
                return;
            }

            if (
                formData.phoneNumber &&
                !/^[0-9]{10}$/.test(formData.phoneNumber)
            ) {
                setErrorMessage("Phone number must be 10 digits");
                return;
            }

            const sanitizedAttributes = {
                first_name: DOMPurify.sanitize(formData.firstName),
                middle_name: DOMPurify.sanitize(formData.middleName),
                last_name: DOMPurify.sanitize(formData.lastName),
                gender: DOMPurify.sanitize(formData.gender),
                address: DOMPurify.sanitize(formData.address),
                phone_number: DOMPurify.sanitize(formData.phoneNumber),
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/profile/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        attributes: sanitizedAttributes,
                    }),
                }
            );

            if (!response.ok) throw new Error("Failed to update user details");
            alert("User details updated successfully!");
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    const onCancel = () => {
      setEditMode(false);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        address: "",
        phoneNumber: "",
      })
    }

    return (
        <div className="profile">
            {!editMode ? (
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
                            <tr>
                                <th>Account Number</th>
                                <td>{accountDetails.accountNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button
                        className="edit-profile"
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                </center>
            ) : (
                <center>
                    <h2>Edit Profile</h2>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>
                                    <input
                                        name="first_name"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => {
                                            setFormData({
                                                firstName: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Middle Name</th>
                                <td>
                                    <input
                                        name="middle_name"
                                        type="text"
                                        value={formData.middleName}
                                        onChange={(e) => {
                                            setFormData({
                                                middleName: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>
                                    <input
                                        name="last_name"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => {
                                            setFormData({
                                                lastName: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(e) => {
                                            setFormData({
                                                gender: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-binary">
                                            Non-binary
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>
                                    <input
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData({
                                                address: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>
                                    <input
                                        name="phone_number"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => {
                                            setFormData({
                                                phoneNumber: e.target.value,
                                            });
                                            setErrorMessage("");
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    {errorMessage && (
                        <div className="error-message">
                            <center>{errorMessage}</center>
                        </div>
                    )}
                    <br />
                    <button onClick={submitUpdatedProfile}>Save</button>
                    <button onClick={() => onCancel()}>Cancel</button>
                </center>
            )}
        </div>
    );
}
