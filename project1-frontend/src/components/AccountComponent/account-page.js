import { Container, Row } from 'react-bootstrap';
import AccountList from './account-list';
import AddAccountForm from './add-account-form';

export default function AccountPage() {

  return (
    <Container>
      <h1>Account List</h1>
      <h1>Account List</h1>
      <Row>
        <AccountList />
      </Row>
      <h2>Add New Account</h2>
      <AddAccountForm />
    </Container>
  );
}
