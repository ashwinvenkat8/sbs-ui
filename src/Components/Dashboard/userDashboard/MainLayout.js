import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from "./Navbar";
import ViewTransactions from "./ViewTransactions";
import UserPage from "./UserPage";
import AddFundsPage from "./AddFunds";
import TransferFundsPage from "./TransferFunds";
import Landing from "./Landing";

function MainLayout() {
  return (
    <div className="App">
      
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/account/:userId" element={<UserPage />} />
          <Route path="/transactions/:userId" element={<ViewTransactions />} />
          <Route path="/add-funds/:userId" element={<AddFundsPage />} />
          <Route path="/transfer-funds/:userId" element={<TransferFundsPage />} />
        </Routes>
      
    </div>
  );
}

export default MainLayout;
