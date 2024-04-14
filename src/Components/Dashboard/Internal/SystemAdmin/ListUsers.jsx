import React, { useState, useEffect } from "react";
// import Popup from "./UserPopup";
import "./Popup.css"

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/profile/all`,
                    {
                        headers: { Authorization: token },
                    }
                );
                const data = await response.json();

                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, [token]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/profile/${userId}`,
                {
                    headers: { Authorization: token },
                }
            );
            if (response.ok) {
                const userDetails = await response.json();
                setSelectedUserDetails(userDetails);
            } else {
                console.error("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handlePopupClose = () => {
        setSelectedUserDetails(null);
      };

    return (
        <div>
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            onClick={() => fetchUserDetails(user._id)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>
                                {user.attributes?.first_name}{" "}
                                {user.attributes?.last_name}
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUserDetails && (
                <Popup user={selectedUserDetails} onClose={handlePopupClose} />
            )}
        </div>

    );
};

const Popup = ({ user, onClose }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <h3>User Details</h3>
          <div>
            <strong>Name:</strong> {user.attributes?.first_name} {user.attributes?.last_name}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong> {user.role}
          </div>
          <div>
            <strong>Date of Birth:</strong> {user.attributes?.date_of_birth}
          </div>
          <div>
            <strong>Gender:</strong> {user.attributes?.gender}
          </div>
          <div>
            <strong>SSN:</strong> {user.attributes?.ssn}
          </div>
          <div>
            <strong>Address:</strong> {user.attributes?.address}
          </div>
          <div>
            <strong>Phone Number:</strong> {user.attributes?.phone_number}
          </div>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

export default ListUsers;
