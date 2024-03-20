// import React, { useState } from 'react';
// import './App.css';
// // Landing page components
// import Home from './Components/Home';
// import Work from './Components/Work';
// import Contact from './Components/Contact';
// import Footer from './Components/Footer';
// // Login and register components
// import { Login } from './Login';
// import { Register } from './Register';
// import AccountsDashboard from './Components/Dashboard/accountdashboard'
// import RegistrationForm from './components/Register/registrationForm';

// function App() {
//   const [currentPage, setCurrentPage] = useState('landing');
  
//   const navigateTo = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App">
//               {
//           currentPage === 'accounts' && (
//             <AccountsDashboard />
//           )
//         }
//       {
//         currentPage === 'landing' && (
//           <>
//             <Home navigateTo={navigateTo} /> {/* Pass navigateTo as a prop */}
//             <Work />
//             <Contact />
//             <Footer />
//           </>
//         )
//       }
//       {
//         currentPage === 'login' && (
//           <Login onFormSwitch={() => navigateTo('register')} />
//         )
//       }
//       {
//         currentPage === 'register' && (
//           <Register onFormSwitch={() => navigateTo('login')} />
//         )
//       }

//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import './App.css';
// // Landing page components
// import Home from './Components/Home';
// import Work from './Components/Work';
// import Contact from './Components/Contact';
// import Footer from './Components/Footer';
// // Login and register components
// import { Login } from './Components/Login';  // Assuming your Login component is inside the Components directory
// import RegistrationForm from './Components/Register/registrationForm';  // Corrected path
// import AccountsDashboard from './Components/Dashboard/accountdashboard';

// function App() {
//   const [currentPage, setCurrentPage] = useState('landing');
  
//   const navigateTo = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App">
//       {currentPage === 'accounts' && <AccountsDashboard />}
//       {currentPage === 'landing' && (
//         <>
//           <Home navigateTo={navigateTo} />
//           <Work />
//           <Contact />
//           <Footer />
//         </>
//       )}
//       {currentPage === 'login' && <Login onFormSwitch={() => navigateTo('register')} />}
//       {currentPage === 'register' && <RegistrationForm onFormSwitch={() => navigateTo('login')} />}
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import './App.css';
// import RegistrationForm from './Components/Register/registrationForm'; // Ensure this path is correct

// function App() {
//   return (
//     <div className="App">
//       <RegistrationForm />
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';
// import RegistrationForm from './Components/Register/registrationForm'; // Assuming the folder is 'Registration' and the file is 'registrationForm.jsx'
// import LoginForm from './Components/Login/login'; // Assuming the folder is 'Login' and the file is 'login.jsx'

// function App() {
//     const [showLogin, setShowLogin] = useState(true);

//     const handleRegisterRedirect = () => {
//         setShowLogin(false);
//     };

//     const handleLoginRedirect = () => {
//         setShowLogin(true);
//     };

//     return (
//         <div className="App">
//             {showLogin ? (
//                 <LoginForm onRegisterRedirect={handleRegisterRedirect} />
//             ) : (
//                 <RegistrationForm onLoginRedirect={handleLoginRedirect} />
//             )}
//         </div>
//     );
// }

// export default App;

// New app.js trying out

import React, { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import RegistrationForm from './Components/Register/registrationForm';
import LoginForm from './Components/Login/login';

function App() {
    // State to manage which component to show: 'home', 'login', 'register', 'landing'
    const [currentPage, setCurrentPage] = useState('landing');

    // Function to navigate to the registration form
    const handleRegisterRedirect = () => {
        setCurrentPage('register');
    };

    // Function to navigate to the login form
    const handleLoginRedirect = () => {
        setCurrentPage('login');
    };

    // Function to navigate back to the landing page
    const handleLandingRedirect = () => {
        setCurrentPage('landing');
    };

    // Determine which component to render based on the current page
    const renderComponent = () => {
        switch (currentPage) {
            case 'login':
                return <LoginForm onRegisterRedirect={handleRegisterRedirect} onHomeRedirect={handleLandingRedirect}/>;
            case 'register':
                return <RegistrationForm onLoginRedirect={handleLoginRedirect} onHomeRedirect={handleLandingRedirect} />;
            case 'landing':
            default:
                return (
                    // Use React.Fragment to group multiple components without adding extra nodes to the DOM
                    <>
                        <Home navigateTo={setCurrentPage} />
                        <Work />
                        <Contact />
                        <Footer />
                    </>
                );
        }
    };

    return (
        <div className="App">
            {renderComponent()}
        </div>
    );
}

export default App;

