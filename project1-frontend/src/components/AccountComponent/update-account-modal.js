import { Button, Modal, Form } from 'react-bootstrap';
import { useAccountContext } from "./account-context";

const UpdateAccountModal = () => {

    const { showUpdateModal, handleCloseModal, editAccountHandleSubmit, 
        selectedAccount, handleInputChangeOnModal } = useAccountContext();

    return (<>

        <Modal show={showUpdateModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editAccountHandleSubmit}>

                    <Form.Group>
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" name="accountName" value={selectedAccount.accountName} onChange={handleInputChangeOnModal} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Balance</Form.Label>
                        <Form.Control type='number' name='balance' value={selectedAccount.balance} onChange={handleInputChangeOnModal} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control as='select' name='accountType' value={selectedAccount.accountType} onChange={handleInputChangeOnModal} required >
                            <option value="CREDIT">CREDIT</option>
                            <option value="DEBIT">DEBIT</option>
                            <option value="LOAN">LOAN</option>
                        </Form.Control>
                    </Form.Group>

                    {selectedAccount.accountType === 'CREDIT' && (
                        <>
                            <Form.Group>
                                <Form.Label>Credit Limit</Form.Label>
                                <Form.Control type="number" name="creditLimit" value={selectedAccount.creditLimit} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>APR</Form.Label>
                                <Form.Control type="number" name="apr" value={selectedAccount.apr} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>
                        </>
                    )}

                    {selectedAccount.accountType === 'LOAN' && (
                        <>
                            <Form.Group>
                                <Form.Label>Principal</Form.Label>
                                <Form.Control type="number" name="principal" value={selectedAccount.principal} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Loan Disbursement Date</Form.Label>
                                <Form.Control type="date" name="loanDisbursementDate" value={selectedAccount.loanDisbursementDate} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Loan Repayment Date</Form.Label>
                                <Form.Control type="date" name="loanRepaymentDate" value={selectedAccount.loanRepaymentDate} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Minimum Monthly Payment</Form.Label>
                                <Form.Control type="number" name="minMonthlyPayment" value={selectedAccount.minMonthlyPayment} onChange={handleInputChangeOnModal} required/>
                            </Form.Group>
                        </>
                    )}

                    <Button variant="primary" type="submit">Update Account</Button>                    
                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default UpdateAccountModal;