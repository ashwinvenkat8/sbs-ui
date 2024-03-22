import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Here you would clear the user's session, cookies, or local storage as needed
        console.log('Logging out...');

        // Redirect to the login page or root of your app
        history.push('/login');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
