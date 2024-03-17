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


import React from 'react';
import './App.css';
import RegistrationForm from './Components/Register/registrationForm'; // Ensure this path is correct

function App() {
  return (
    <div className="App">
      <RegistrationForm />
    </div>
  );
}

export default App;
