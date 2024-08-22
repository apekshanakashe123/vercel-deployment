import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log(token)
    const fetchAccounts = async () => {
      const response = await axios.get('http://localhost:3021/account/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(response.data);
    };

    fetchAccounts();
  }, [token]);

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li>{account.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
