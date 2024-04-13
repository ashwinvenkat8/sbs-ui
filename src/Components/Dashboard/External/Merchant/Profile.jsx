import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function Profile({ token }) {
  const [userDetails, setUserDetails] = useState({});
  const [userAttributes, setUserAttributes] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);

        setUserId(decodedToken.userId);

        const accountResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/user/account/${decodedToken.accountId}`,
          {
            headers: { Authorization: token },
          }
        );

        if (!accountResponse.ok) throw new Error("Failed to fetch user details");

        const accountData = await accountResponse.json();

        setAccountDetails(accountData);
        setUserDetails(accountData.user);
        setUserAttributes(accountData.user.attributes);
        setUpdatedAddress(accountData.address);
        setUpdatedPhoneNumber(accountData.phone_number);

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/profile/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attributes: {
              address: updatedAddress,
              phone_number: updatedPhoneNumber,
            },
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

  return (
    <div className="profile">
      {!editMode ? (
        <center>
          <h2>User Profile</h2>
          <br />
          <table>
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
          </table>
          <br />
          <button className="edit-profile" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </center>
      ) : (
        <center>
          <h2>Edit Profile</h2>
          <br />
          <table>
            <tr>
              <th>Address</th>
              <td>
                <input
                  type="text"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>
                <input
                  type="tel"
                  value={updatedPhoneNumber}
                  onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                />
              </td>
            </tr>
            {/* <tr>
              <th>Email</th>
              <td>
                <input
                  type="text"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
              </td>
            </tr> */}
          </table>
          <br />
          <button onClick={handleUpdateDetails}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </center>
      )}
    </div>
  );
}
