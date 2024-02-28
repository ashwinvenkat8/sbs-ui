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
  const [currentPage, setCurrentPage] = useState('landing');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {
        currentPage === 'landing' && (
          <>
            <Home navigateTo={navigateTo} /> {/* Pass navigateTo as a prop */}
            <Work />
            <Contact />
            <Footer />
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
