import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccountContext } from './account-context';

const AddAccountForm = () => {

  const { state, handleInputChange, handleSubmit } = useAccountContext();

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Account Name</Form.Label>
        <Form.Control type='text' name='accountName' value={state.newAccount.accountName} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Balance</Form.Label>
        <Form.Control type='number' name='balance' value={state.newAccount.balance} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Account Type</Form.Label>
        <Form.Control as='select' name='accountType' value={state.newAccount.accountType} onChange={handleInputChange} required >
          <option value="CREDIT">CREDIT</option>
          <option value="DEBIT">DEBIT</option>
          <option value="LOAN">LOAN</option>
        </Form.Control>
      </Form.Group>

      {state.newAccount.accountType === 'CREDIT' && (
        <>
          <Form.Group>
            <Form.Label>Credit Limit</Form.Label>
            <Form.Control type="number" name="creditLimit" value={state.newAccount.creditLimit} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>APR</Form.Label>
            <Form.Control type="number" name="apr" value={state.newAccount.apr} onChange={handleInputChange} />
          </Form.Group>
        </>
      )}

      {state.newAccount.accountType === 'LOAN' && (
        <>
          <Form.Group>
            <Form.Label>Principal</Form.Label>
            <Form.Control type="number" name="principal" value={state.newAccount.principal} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Loan Disbursement Date</Form.Label>
            <Form.Control type="date" name="loanDisbursementDate" value={state.newAccount.loanDisbursementDate} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Loan Repayment Date</Form.Label>
            <Form.Control type="date" name="loanRepaymentDate" value={state.newAccount.loanRepaymentDate} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Minimum Monthly Payment</Form.Label>
            <Form.Control type="number" name="minMonthlyPayment" value={state.newAccount.minMonthlyPayment} onChange={handleInputChange} />
          </Form.Group>
        </>
      )}

      <Button type='submit'>Add Account</Button>
    </Form>
  );
};

export default AddAccountForm;