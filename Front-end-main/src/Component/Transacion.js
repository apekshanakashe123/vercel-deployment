import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [meassage,setMeassage]=useState('')
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log(token)
      const response = await axios.get('https://vercel-deployment-gamma-gules.vercel.app/Trans/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    };

    fetchTransactions();
  }, [token]);

  const handleDeposit = async () => {
    console.log(token);
  
    const today = new Date();
    const TransDate = today.toISOString().split('T')[0];
  
    try {
      const response = await axios.post(
        'https://vercel-deployment-gamma-gules.vercel.app/Trans/deposit',
        { amount, TransDate }, 
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      if (response.data.message === 'Deposit successful') {
        setBalance(response.data.newBalance); 
        setMeassage('Deposit successful');
      } else {
        setMeassage('Deposit failed: ' + response.data.message);
      }
      setAmount('');
      
    
        } catch (error) {
      
      console.error('Deposit failed:', error);
    }
  };
  

  const handleWithdraw = async () => {
    if (parseFloat(amount) > balance) {
      alert('Insufficient funds');
      return;
    }
    const today = new Date();
    const Withdrawdate = today.toISOString().split('T')[0];

    const withdrawresponse =await axios.post(
      'https://vercel-deployment-gamma-gules.vercel.app/Trans/withdraw',
      { amount },
      {Withdrawdate},{
      headers: { Authorization: `Bearer ${token}` } }
    );
    if (withdrawresponse.data.message === 'Withdrawal successful') {
      setBalance(withdrawresponse.data.newBalance); 
      setMeassage('Withdrawal successful');
    } else {
      setMeassage('Withdrawal failed: ' + withdrawresponse.data.message);
    }
   
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.AccountId}>{transaction.AccountID}: {transaction.Username}:{transaction.Amount}:{transaction.TransactionType}:{transaction.balanceAmount}</li>
        ))}
      </ul>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      {meassage && <p style={{ color: meassage.includes('failed') ? 'red' : 'green', marginTop: '10px' }}>{meassage}</p>}
    </div>
  );
};

export default Transactions;



