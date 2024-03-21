import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Navbar"; // Adjusted to current directory
import ViewTransactions from "./ViewTransactions"; // Adjusted to current directory
import UserPage from "./UserPage"; // Adjusted to current directory
import AddFundsPage from "./AddFunds"; // Adjusted to current directory
import TransferFundsPage from "./TransferFunds"; // Adjusted to current directory
import Landing from "./Landing"; // Adjusted to current directory

function MainLayout() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/account/:index" element={<UserPage />} />
        <Route exact path="/transactions/:index" element={<ViewTransactions />} />
        <Route exact path="/add-funds/:index" element={<AddFundsPage />} />
        <Route exact path="/transfer-funds/:index" element={<TransferFundsPage />} />
      </Routes>
    </div>
  );
}

export default MainLayout;

