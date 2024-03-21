



// New app.js trying out

// import React, { useState } from 'react';
// import './App.css';
// import Home from './Components/Home';
// import Work from './Components/Work';
// import Contact from './Components/Contact';
// import Footer from './Components/Footer';
// import RegistrationForm from './Components/Register/registrationForm';
// import LoginForm from './Components/Login/login';


// function App() {
//     // State to manage which component to show: 'home', 'login', 'register', 'landing'
//     const [currentPage, setCurrentPage] = useState('landing');

//     // Function to navigate to the registration form
//     const handleRegisterRedirect = () => {
//         setCurrentPage('register');
//     };

//     // Function to navigate to the login form
//     const handleLoginRedirect = () => {
//         setCurrentPage('login');
//     };

//     // Function to navigate back to the landing page
//     const handleLandingRedirect = () => {
//         setCurrentPage('landing');
//     };

//     // Determine which component to render based on the current page
//     const renderComponent = () => {
//         switch (currentPage) {
           
//             case 'login':
//                 return <LoginForm onRegisterRedirect={handleRegisterRedirect} onHomeRedirect={handleLandingRedirect}/>;
//             case 'register':
//                 return <RegistrationForm onLoginRedirect={handleLoginRedirect} onHomeRedirect={handleLandingRedirect} />;
//             case 'landing':
//             default:
//                 return (
//                     // Use React.Fragment to group multiple components without adding extra nodes to the DOM
//                     <>
//                         <Home navigateTo={setCurrentPage} />
//                         <Work />
//                         <Contact />
//                         <Footer />
//                     </>
//                 );
//         }
//     };

//     return (
//         <div className="App">
//             {renderComponent()}
//         </div>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import RegistrationForm from './Components/Register/registrationForm';
import LoginForm from './Components/Login/login';
import MainLayout from './Components/Dashboard/userDashboard/MainLayout'; // Assuming you have a Dashboard component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<><Home /><Work /><Contact /><Footer /></>} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/dashboard/*" element={<MainLayout />} />
                    {/* Define other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
