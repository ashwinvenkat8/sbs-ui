import React, { useState } from 'react';
import './App.css';
// Landing page components
import Home from './Components/Home';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
// Login and register components
import { Login } from './Login';
import { Register } from './Register';

function App() {
  // State to control the current view: 'landing', 'login', or 'register'
  const [currentPage, setCurrentPage] = useState('landing');
  
  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="App">
      {
        currentPage === 'landing' && (
          <>
            <Home />
            <Work />
            <Contact />
            <Footer />
            {/* Button to navigate to the login page */}
            <button onClick={() => navigateTo('login')}>Go to Login</button>
          </>
        )
      }
      {
        currentPage === 'login' && (
          <Login onFormSwitch={() => navigateTo('register')} />
        )
      }
      {
        currentPage === 'register' && (
          <Register onFormSwitch={() => navigateTo('login')} />
        )
      }
    </div>
  );
}

export default App;
