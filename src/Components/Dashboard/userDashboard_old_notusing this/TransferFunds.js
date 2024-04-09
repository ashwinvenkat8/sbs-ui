import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransferFundsPage({ index }) {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleBeneficiaryNameChange = (e) => {
    setBeneficiaryName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleConfirmAccountNumberChange = (e) => {
    setConfirmAccountNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if account number and confirm account number match
    if (accountNumber !== confirmAccountNumber) {
      alert("Account numbers do not match");
      return;
    }
    // You can perform any necessary actions, such as transferring funds to the specified external account
    console.log("Funds transferred:", amount);
    console.log("To Account Number:", accountNumber);
    console.log("Beneficiary Name:", beneficiaryName);
    // Redirect the user back to the view transactions page
    navigate(`/transactions/${index}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Transfer Funds to External Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="beneficiaryName" className="form-label">
            Beneficiary Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="beneficiaryName"
            value={beneficiaryName}
            onChange={handleBeneficiaryNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">
            External Account Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmAccountNumber" className="form-label">
            Confirm External Account Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="confirmAccountNumber"
            value={confirmAccountNumber}
            onChange={handleConfirmAccountNumberChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:
          </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Transfer Funds
        </button>
      </form>
    </div>
  );
}
