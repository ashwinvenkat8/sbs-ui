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
    }, [isLoggedIn, userId]);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }

        // Clear local storage and update state
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUserRole(null);
        alert('You are being redirected to Home Page');
        navigate("/");
    };

    return { isLoggedIn, userRole, userId, handleLogout };
};