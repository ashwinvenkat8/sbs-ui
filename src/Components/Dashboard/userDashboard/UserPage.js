import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserPage() {
  // This is the base URL for your API
  const baseUrl = "http://127.0.0.1:8080/api/v1/user/account";

  let navigate = useNavigate();
  const { userId } = useParams(); // Grab the userId from the URL

  // State for user details
  const [user, setUser] = useState({
    userId: "",
    accountNumber: "",
    accountHolder: "",
    accountType: "",
    contact: "",
    email: "",
    password: "",
  });

  const [readOnly, setReadOnly] = useState(true);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${userId}`);
        setUser(response.data); // Set user data from API response
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error here (e.g., set error message state, navigate to an error page, etc.)
      }
    };

    fetchUserData();
  }, [userId, baseUrl]);

  // Update user state on form input changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform PUT request to update user data here
    // ...
  };

  // Toggle read-only state for editing
  const handleEditClick = () => {
    setReadOnly(!readOnly);
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        // Perform DELETE request to delete the user account here
        // ...
        navigate("/"); // Redirect to the home page after deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle error here
      }
    }
  };

  return (
    <div className="container m-auto row mt-5 d-flex align-items-center col-lg-5">
      <h1 className="text-start col-12">My Account</h1>
      <div className="col-12">
        <button
          className="btn btn-outline-primary float-end"
          onClick={handleEditClick}
        >
          {readOnly ? "Edit" : "Cancel"}
        </button>
      </div>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Form fields here, similar to the ones you have */}
        {/* ... */}
        <div className="col-12 my-4 mt-lg-5 d-flex justify-content-between">
          <Link to="/" className="btn btn-outline-info">
            Back to Home
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            Delete account
          </button>
        </div>
      </form>
    </div>
  );
}
