import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

export function TransferFunds({ isCancelled, isCompleted }) {
  const [toAccountNumber, setToAccountNumber] = useState(Number);
  const [amount, setAmount] = useState(Number);
  const [transactionOTP, setTransactionOTP] = useState(Number);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleTransfer = async () => {
    setShowOTPVerification(true);
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const decodeToken = jwtDecode(token);

    if (!token) throw new Error("JWT not found");

    try {
      const otpResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/otp/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User": `${decodeToken.userId}`,
          },
          body: JSON.stringify({
            token: transactionOTP,
          }),
        }
      );

      if (!otpResponse.ok) throw new Error();
    } catch (error) {
      alert("Error in OTP, re-enter the OTP");
    }

    try {
      const accountResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/user/account/${decodeToken.accountId}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      if (!accountResponse.ok) throw new Error("Failed to fetch user details");

      const accountData = await accountResponse.json();

      const fromAccountNumber = accountData.accountNumber;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transaction/new`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAccountNumber,
            to: toAccountNumber,
            amount,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to transfer funds");
      const responseJson = await response.json();
      alert(responseJson.message);

      isCompleted = true;
      
    } catch (error) {
      console.error("Error transferring funds:", error);
      alert("Error transferring funds. Please try again.");
    }
  };
  const onCancel = () => {
    setToAccountNumber("");
    setAmount("");
    setTransactionOTP("");
    setShowOTPVerification(false);
    isCancelled = true;
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      {!showOTPVerification && (
        <>
          <div>
            <label>Account Number:</label>
            <input
              type="number"
              value={toAccountNumber}
              onChange={(e) => setToAccountNumber(e.target.value)}
              placeholder="Enter recipient's account number"
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to transfer"
            />
          </div>
          <button onClick={handleTransfer}>Send</button>
        </>
      )}
      {showOTPVerification && (
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={transactionOTP}
            onChange={(e) => setTransactionOTP(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleOTPVerification}>Verify OTP</button>
        </div>
      )}
      <button onClick={onCancel}>Cancel</button>
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
    </div>
  );
}
