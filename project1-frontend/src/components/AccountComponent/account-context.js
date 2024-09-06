import React, { createContext, useContext, useState } from 'react';
import { fetchAccountsApi, addAccountApi, deleteAccountApi, updateAccountApi } from './account-api';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleEditAccount = (account) => {
    console.log(account);
    setSelectedAccount(account);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedAccount(null);
  };

  const [state, setState] = useState({
    accounts: [],
    newAccount: {
      accountName: '',
      balance: '',
      accountType: 'CREDIT',
      creditLimit: '',
      apr: '',
      principal: '',
      loanDisbursementDate: '',
      loanRepaymentDate: '',
      minMonthlyPayment: ''
    }
  });

  const fetchAccounts = () => {
    console.log("here in fetch account of context class")
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      var userId = user.id;
    }
    fetchAccountsApi(userId)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          accounts: response.data
        }));
      })
      .catch(error => console.error('There was an error fetching the accounts.', error));
  };

  const handleUpdateAccount = (updatedAccountFromDB) => {
    // Update the accounts list in state with the updated account
    const updatedAccounts = state.accounts.map(account =>
      account.accountId === updatedAccountFromDB.accountId ? updatedAccountFromDB : account
    );
    setState(prevState => ({
      ...prevState,
      accounts: updatedAccounts
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      newAccount: {
        ...prevState.newAccount,
        [name]: value
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      var userId = user.id;
    }

    addAccountApi(userId, state.newAccount)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          accounts: [...prevState.accounts, response.data],
          newAccount: {
            accountName: '',
            balance: '',
            accountType: 'CREDIT',
            creditLimit: '',
            apr: '',
            principal: '',
            loanDisbursementDate: '',
            loanRepaymentDate: '',
            minMonthlyPayment: ''
          }
        }));
      })
      .catch(error => {
        console.error('There was an error creating the account.', error);
      });
  };

  const closeAccount = (accountId) => {
    deleteAccountApi(accountId)
      .then(response => {
        if (response.data) {
          setState(prevState => ({
            ...prevState,
            accounts: prevState.accounts.filter(account => account.accountId !== accountId)
          }));
          console.log(`Account with ID ${accountId} deleted.`);
        }
      })
      .catch(error => {
        console.error('There was an error deleting the account.', error);
      });
  };

  const editAccountHandleSubmit = (event) => {
    event.preventDefault();
    updateAccountApi(selectedAccount)
        .then(response => {
            handleUpdateAccount(response.data); // Update the state in parent component
            handleCloseModal(); // Close the modal
        })
        .catch(error => {
            console.error('Error updating account: ', error);
        });
};

const handleInputChangeOnModal = (event) => {
  const { name, value } = event.target;
  setSelectedAccount({ ...selectedAccount, [name]: value });
};

  return (
    <AccountContext.Provider value={{ state, fetchAccounts, handleInputChange, handleSubmit, closeAccount, setState, handleUpdateAccount,
      showUpdateModal, setShowUpdateModal, selectedAccount, setSelectedAccount, handleEditAccount, handleCloseModal, editAccountHandleSubmit,
      handleInputChangeOnModal}}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  return useContext(AccountContext);
};
