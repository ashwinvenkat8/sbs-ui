import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const decodeToken = jwtDecode(token);
        const role = decodeToken.role;
        const userid = decodeToken.userId;

        setIsLoggedIn(!!token);
        setUserRole(role);
        setUserId(userid);
        console.log(userId);
    }, [userId]);

    const handleLogout = async () => {
        // Send logout request to the backend
        try {
            
          const response = await fetch(`${process.env.API_URL}/auth/logout`, {
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
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUserRole(null);
        alert('You are being redirected to Home Page')
        navigate("/");
    };


    return { isLoggedIn, userRole, userId, handleLogout };
};