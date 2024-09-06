import React from 'react';
import { useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useAccountContext } from './account-context';
import UpdateAccountModal from './update-account-modal';

export default function AccountList() {
  const { closeAccount, fetchAccounts, state, selectedAccount, handleEditAccount } = useAccountContext();

  useEffect(() => {
    // Fetch accounts on component mount
    console.log("here in account list");
    fetchAccounts();
  }, []);

  return (
    <>
      {state.accounts.map(account => (
        <Col key={account.accountId} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{account.accountName}</Card.Title>
              <Card.Text as="div">
                <div style={{ fontWeight: 'bold' }}>Balance: ${account.balance}</div>
                <div>Type: {account.accountType}</div>
                <div>Credit Limit: ${account.creditLimit}</div>
                {/* ... other details */}
              </Card.Text>
              <div className="d-flex justify-content-between m-2">
                <Button variant="danger" onClick={() => closeAccount(account.accountId)}>Close Account</Button>
                <Button variant="primary" onClick={() => handleEditAccount(account)}>Edit Account</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}

      {/* Modal for updating account */}
      {selectedAccount && (
        <UpdateAccountModal />
      )}
    </>
  );
};