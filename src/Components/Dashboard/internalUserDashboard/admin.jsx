// import React, { useEffect, useState } from 'react';
// import LogoutButton from '../../logout'; // Make sure the path is correct for your project structure
// import './admin.css';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState(null);

//     const fetchUsers = async () => {
//         // Replace with your actual API endpoint
//         const response = await fetch('http://127.0.0.1:8080/api/v1/user/account/all');
//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         }
//         throw new Error('Network response was not ok.');
//     };

//     const toggleUserDetail = (userId) => {
//         setSelectedUserId(selectedUserId === userId ? null : userId);
//     };

//     useEffect(() => {
//         fetchUsers().then(setUsers).catch(console.error);
//     }, []);

//     return (
//         <div className="admin-dashboard">
//             <h1>System Admin Dashboard</h1>
//             <LogoutButton />
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <React.Fragment key={user.id}>
//                             <tr>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     <button onClick={() => toggleUserDetail(user.id)}>View</button>
//                                 </td>
//                             </tr>
//                             {selectedUserId === user.id && (
//                                 <tr className="detail-view">
//                                     <td colSpan="3">
//                                         <div>
//                                             <h3>Profile Details</h3>
//                                             <p>First Name: {user.profile.first_name}</p>
//                                             <p>Middle Name: {user.profile.middle_name}</p>
//                                             <p>Last Name: {user.profile.last_name}</p>
//                                             <p>Date of Birth: {user.profile.date_of_birth}</p>
//                                             <p>Gender: {user.profile.gender}</p>
//                                             <p>SSN: {user.profile.ssn}</p>
//                                             <p>Address: {user.profile.address}</p>
//                                             <p>Phone Number: {user.profile.phone_number}</p>
//                                             <h3>Account Details</h3>
//                                             <p>Account Number: {user.account.accountNumber}</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import LogoutButton from '../../logout'; // Adjust the import path as needed
import './admin.css';

const AdminDashboard = () => {
    const [accountHolders, setAccountHolders] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchAccountHolders = async () => {
        try {
            const token = localStorage.getItem('authToken'); // or sessionStorage.getItem('authToken')
            const response = await fetch('http://127.0.0.1:8080/api/v1/user/account/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAccountHolders(data);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    

    useEffect(() => {
        fetchAccountHolders();
    }, []);

    const toggleUserDetail = (userId) => {
        setSelectedUserId(selectedUserId === userId ? null : userId);
    };

    return (
        <div className="admin-dashboard">
            <h1>System Admin Dashboard</h1>
            <LogoutButton />
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Account Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accountHolders.map(({ user, accountNumber }) => (
                        <React.Fragment key={user._id}>
                            <tr>
                                <td>{user.attributes.first_name}</td>
                                <td>{user.attributes.last_name}</td>
                                <td>{user.email}</td>
                                <td>{accountNumber}</td>
                                <td>
                                    <button onClick={() => toggleUserDetail(user._id)}>View</button>
                                </td>
                            </tr>
                            {selectedUserId === user._id && (
                                <tr className="detail-view">
                                    <td colSpan="5">
                                        <div>
                                            <h3>Profile Details</h3>
                                            <p>First Name: {user.attributes.first_name}</p>
                                            <p>Middle Name: {user.attributes.middle_name}</p>
                                            <p>Last Name: {user.attributes.last_name}</p>
                                            <p>Date of Birth: {user.attributes.date_of_birth}</p>
                                            <p>Gender: {user.attributes.gender}</p>
                                            <p>SSN: {user.attributes.ssn}</p>
                                            <p>Address: {user.attributes.address}</p>
                                            <p>Phone Number: {user.attributes.phone_number}</p>
                                            <h3>Account Details</h3>
                                            <p>Account Number: {accountNumber}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

