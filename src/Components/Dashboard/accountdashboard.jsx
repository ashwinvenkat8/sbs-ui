import React, { useState } from 'react';
import './dashboard.css'; // Ensure this path matches your CSS file location

const initialAccounts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', balance: 1000, transactions: [{ id: 1, type: 'Credit', amount: 200 }, { id: 2, type: 'Debit', amount: -50 }] },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', balance: 1200, transactions: [{ id: 3, type: 'Credit', amount: 500 }, { id: 4, type: 'Debit', amount: -150 }] },
];

const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [newAccount, setNewAccount] = useState({ name: '', email: '' });
  const [editAccount, setEditAccount] = useState(null);
  const [currentSection, setCurrentSection] = useState('profile');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddAccount = (event) => {
    event.preventDefault();
    const newId = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId, balance: 0, transactions: [] }]);
    setNewAccount({ name: '', email: '' }); // Reset form
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditAccount = (account) => {
    setEditAccount(account);
  };

  const handleSaveEdit = () => {
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === editAccount.id) {
        return { ...editAccount };
      }
      return acc;
    });
    setAccounts(updatedAccounts);
    setEditAccount(null); // Clear edit state
  };

  const handleAccountChange = (event) => {
    const { name, value } = event.target;
    setNewAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMoney = (event) => {
    event.preventDefault();
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0 || !recipientId) {
      alert("Please enter valid recipient and amount");
      return;
    }

    const recipientAccount = accounts.find(account => account.id === parseInt(recipientId));
    if (!recipientAccount) {
      alert("Recipient account not found");
      return;
    }

    // Simulate transaction: update recipient's balance and transaction history
    const updatedAccounts = accounts.map(account => {
      if (account.id === recipientAccount.id) {
        const newTransactionId = account.transactions.length + 1;
        const updatedTransactions = [...account.transactions, { id: newTransactionId, type: 'Credit', amount: amountNum }];
        return { ...account, balance: account.balance + amountNum, transactions: updatedTransactions };
      }
      return account;
    });

    setAccounts(updatedAccounts);
    // Reset form fields
    setRecipientId('');
    setAmount('');
    alert(`$${amount} sent to account ID: ${recipientId}`);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <ul>
          <li onClick={() => setCurrentSection('profile')}>Profile</li>
          <li onClick={() => setCurrentSection('sendMoney')}>Send Money</li>
          <li onClick={() => setCurrentSection('transactions')}>Transaction History</li>
        </ul>
      </nav>
      {currentSection === 'profile' && (
        <div className="section profiles">
          <h2>Accounts Dashboard</h2>
          <form onSubmit={handleAddAccount}>
            <input
              name="name"
              value={newAccount.name}
              onChange={handleAccountChange}
              placeholder="Name"
              required
            />
            <input
              name="email"
              value={newAccount.email}
              onChange={handleAccountChange}
              placeholder="Email"
              required
            />
            <button type="submit">Add Account</button>
          </form>
          {editAccount && (
            <div>
              <input
                name="name"
                value={editAccount.name}
                onChange={handleEditChange}
                placeholder="Name"
                required
              />
              <input
                name="email"
                value={editAccount.email}
                onChange={handleEditChange}
                placeholder="Email"
                required
              />
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          )}
          <ul>
            {accounts.map((account) => (
              <li key={account.id}>
                {account.name} ({account.email}) - Balance: ${account.balance}
                <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                <button onClick={() => handleEditAccount(account)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentSection === 'sendMoney' && (
        <div className="section">
          <h2>Send Money</h2>
          <form onSubmit={handleSendMoney}>
            <input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="Recipient Account ID"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      {currentSection === 'transactions' && (
        <div className="section">
          <h2>Transaction History</h2>
          {accounts.map((account) => (
            <div key={account.id} className="transaction-account">
              <h3>{account.name} - Transactions</h3>
              <ul>
                {account.transactions.map((transaction) => (
                  <li key={transaction.id}>{transaction.type} - ${Math.abs(transaction.amount)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsDashboard;
