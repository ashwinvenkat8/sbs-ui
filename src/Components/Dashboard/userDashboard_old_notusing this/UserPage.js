import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function UserPage() {
  const profileUrl = "http://127.0.0.1:8080/api/v1/user/profile"; 
  const accountUrl = "http://127.0.0.1:8080/api/v1/user/account";
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [userInfo, setUserInfo] = useState({
    accountNumber: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });
  const [readOnly, setReadOnly] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const accountResponse = await axios.get(`${accountUrl}/${userId}`, config);
        const profileResponse = await axios.get(`${profileUrl}/${userId}`, config);

        setUserInfo({
          accountNumber: accountResponse.data.accountNumber,
          ...profileResponse.data,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`${profileUrl}/${userId}`, {
        phone_number: userInfo.phone_number,
        address: userInfo.address,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Details updated successfully.");
      setReadOnly(true);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setErrorMessage("Error updating profile.");
    }
  };

  const handleEditClick = () => setReadOnly(!readOnly);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`${profileUrl}/1`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Account deleted successfully.");
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        setErrorMessage("Error during account deletion.");
      }
    }
  };

  return (
    <div className="container m-auto row mt-5 d-flex align-items-center col-lg-5">
      <h1 className="text-start col-12">My Account</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="col-12">
        <button className="btn btn-outline-primary float-end" onClick={handleEditClick}>
          {readOnly ? "Edit" : "Cancel"}
        </button>
      </div>
      <div className="w-100">
        <p>Account Number: {userInfo.accountNumber}</p>
        <p>First Name: {userInfo.first_name}</p>
        <p>Middle Name: {userInfo.middle_name}</p>
        <p>Last Name: {userInfo.last_name}</p>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Phone Number</label>
            <input type="text" className="form-control" name="phone_number" value={userInfo.phone_number} onChange={handleChange} disabled={readOnly} />
          </div>
          <div className="col-12">
            <label>Address</label>
            <input type="text" className="form-control" name="address" value={userInfo.address} onChange={handleChange} disabled={readOnly} />
          </div>
          {!readOnly && (
            <div className="col-12">
              <button type="submit" className="btn btn-success">Save Changes</button>
            </div>
          )}
        </form>
      </div>
      <div className="col-12 my-4 d-flex justify-content-between">
        <Link to="/" className="btn btn-outline-info">Back to Home</Link>
        <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
}
