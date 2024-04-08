// import React, { useState } from 'react';
// import './registration.css';

// const RegistrationForm = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         gender: '',
//         dateOfBirth: '',
//         ssn: '',
//         phoneNumber: '',
//         countryPhone: '', 
//         address: '',
//         //city: '',
//         //state: '',
//         //zipCode: '',
//         //country: '',
//         userRole: '',
//         email: '',
//         username: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [showSSN, setShowSSN] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let isValid = true;

//         // Add validation rules here
//         switch (name) {
//             case 'firstName':
//             case 'lastName':
//             //case 'state':
//             //case 'country':
//                 isValid = /^[A-Za-z]*$/.test(value);
//                 break;
//             case 'ssn':
//                 isValid = /^\d{0,9}$/.test(value);
//                 break;
//             case 'phoneNumber':
//                 isValid = /^\d{0,10}$/.test(value);
//                 break;
//             // case 'zipCode':
//             //     isValid = /^\d{0,5}$/.test(value);
//             //     break;
//             // case 'email':
//             //     isValid = true;
//               //  break;
//             case 'username':
//                 isValid = true;
//                 break;
//             case 'password':
//                 isValid = true;
//                 break;
//             case 'confirmPassword':
//                 isValid = true;
//                 break;
//             default:
//                 isValid = true;
//         }

//         if (!isValid) {
//             setErrorMessage(`Invalid input in ${name}`);
//             return;
//         }

//         setErrorMessage('');
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (formData.confirmPassword !== formData.password) {
//             setErrorMessage('Passwords do not match');
//             setFormData(prevState => ({ ...prevState, confirmPassword: '' }));
//             return;
//         }
//         setErrorMessage('');
//         console.log(formData);
//     };

//     const toggleSSNVisibility = () => setShowSSN(!showSSN);
//     const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    

//     return (
//         <form onSubmit={handleSubmit}>
//         <div className="registration-container">
          
              
//                 <div className="form-section">
//                     <h2>Personal Information</h2>
//                     <label>First Name</label>
//                     <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

//                     <label>Last Name</label>
//                     <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

//                     <label>Gender</label>
//                     <select name="gender" value={formData.gender} onChange={handleChange} required>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                     </select>

//                     <label>Date of Birth</label>
//                     <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

//                     <label>SSN (Social Security Number)</label>
//                     <div className="input-group">
//                         <input
//                             type={showSSN ? "text" : "password"}
//                             name="ssn"
//                             value={formData.ssn}
//                             onChange={handleChange}
//                             maxLength="9"
//                             required
//                         />
//                         <button type="button" onClick={toggleSSNVisibility} className="toggle-visibility">
//                             {showSSN ? 'Hide' : 'Show'}
//                         </button>
//                     </div>

//                     <label>Phone Number</label>
//                     <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} maxLength="10" required />

//                     <label>Address</label>
//                     <input type="text" name="address" value={formData.address} onChange={handleChange} required />

//                     {/* <label>City</label>
//                     <input type="text" name="city" value={formData.city} onChange={handleChange} required />

//                     <label>State</label>
//                     <input type="text" name="state" value={formData.state} onChange={handleChange} required />

//                     <label>Zip Code</label>
//                     <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required maxLength="5" />

//                     <label>Country</label>
//                     <input type="text" name="country" value={formData.country} onChange={handleChange} required /> */}
//                 </div>

//                 <div className="form-section">
//                     <h2>Account Information</h2>
//                     <label>User Type</label>
//                     <select name="userRole" value={formData.userRole} onChange={handleChange} required>
//                         <option value="">Select User Type</option>
//                         <option value="CUSTOMER">Customer</option>
//                         <option value="MERCHANT">Merchant</option>
//                         <option value="EMPLOYEE">Employee</option>
//                         <option value="SYSTEM_MANAGER">System Manager</option>
//                     </select>

//                     <label>Email</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//                     <label>Username</label>
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} required minLength="6" />

//                     <label>Password</label>
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="7" />

//                     <label>Confirm Password</label>
//                     <div className="input-group">
//                         <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-visibility">
//                             {showConfirmPassword ? 'Hide' : 'Show'}
//                         </button>
//                     </div>

//                     {errorMessage && <div className="error-message">{errorMessage}</div>}
//                 </div>

              
//         </div>
//         <button type="submit" className="submit-button">Register</button>
//             </form>
//     );
// };

// export default RegistrationForm;

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; 
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // Ensure this path is correct for your CSS file

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        ssn: '',
        phoneNumber: '',
        address: '',
        userRole: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showSSN, setShowSSN] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.confirmPassword !== formData.password) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            ssn: formData.ssn,
            address: formData.address,
            phone_number: formData.phoneNumber,
            role: formData.userRole
        };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register');
            }

            const result = await response.json();
            console.log('Registration success:', result);
            //Function to redirect to login page:
            //alert("success");
            navigate('/login')
            // Optionally reset form or redirect the user
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message || 'An error occurred during registration.');
        }
    };

    const toggleSSNVisibility = () => setShowSSN(!showSSN);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <form onSubmit={handleSubmit}>
            <div className="registration-container">
                {/* Personal Information Section */}
                <div className="form-section">
                    <h2>Personal Information</h2>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                    <label>SSN (Social Security Number)</label>
                    <div className="input-group">
                        <input
                            type={showSSN ? "text" : "password"}
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleChange}
                            maxLength="9"
                            required
                        />
                        <button type="button" onClick={toggleSSNVisibility} className="toggle-visibility">
                            {showSSN ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <label>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                {/* Account Information Section */}
                <div className="form-section">
                    <h2>Account Information</h2>
                    <label>User Type</label>
                    <select name="userRole" value={formData.userRole} onChange={handleChange} required>
                        <option value="">Select User Type</option>
                        <option value="CUSTOMER">Customer</option>
                        <option value="MERCHANT">Merchant</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="SYSTEM_MANAGER">System Manager</option>
                    </select>

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required minLength="6" />

                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="7" />

                    <label>Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-visibility">
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <button type="submit" className="submit-button">Register</button>
            <div className="form-footer">
                <button type="button" onClick={() => navigate('/')} className="form-footer-button">Home</button>
                <button type="button" onClick={() => navigate('/login')} className="form-footer-button">Login</button>
            </div>
        </form>
    );
};

export default RegistrationForm;

