import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
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
            alert('Error during logout:', error);
        }

        // Clear local storage and update state
        localStorage.removeItem('authToken');
        navigate("/login");
    };

    return { handleLogout };
};