import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const decodeToken = jwtDecode(token);
        const role = decodeToken.role;

        setIsLoggedIn(!!token);
        setUserRole(role);
    }, []);

    const handleLogout = async () => {
        // Send logout request to the backend
        try {
            
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    
        // Clear local storage and update state
        setIsLoggedIn(false);
        setUserRole(null);
        alert('You are being redirected to Home Page')
        navigate("/");
    };


    return { isLoggedIn, userRole, handleLogout };
};