import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { HoldingForm } from './holdings/form/HoldingForm';
import { IHolding } from '../app/models/IHolding';
import { IUser } from '../app/models/IUsers';
import { history } from '../index';
import { useLocation } from 'react-router-dom';

interface IProps {
  user: IUser | null;
  setUser: (user: null) => void;
  handleCreateSubmit: (holding: IHolding) => Promise<unknown>;
  setSelectedHolding: (holding: IHolding) => void;
}
export const NavMenu: React.FC<IProps> = ({ handleCreateSubmit, setSelectedHolding, user, setUser }) => {
  let location = useLocation();
  let [showModal, setShowModal] = useState<boolean>(false);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    history.push('/');
  }
  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand style={{fontStyle:'oblique', fontSize:'large', color:'white'}} href="/">Fantasy Stock Tracker</Navbar.Brand>
        {user &&
          <Nav className="mr-auto">
            <Nav.Link href="/holdings">Holdings</Nav.Link>
            <Nav.Link>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Create Holding
            </Button>
              <Modal
                show={showModal}
                size="sm"
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
                keyboard
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create new Holding</Modal.Title>
                </Modal.Header>
                <HoldingForm setSelectedHolding={setSelectedHolding} handleSubmit={handleCreateSubmit} formHolding={null} onCancelForm={setShowModal} />
              </Modal>
            </Nav.Link>
          </Nav>
        }
        <Nav className="justify-content-end">
          <Navbar.Text>Hello {user ? user.userName : 'Guest'} {'    '}</Navbar.Text>
           {user ? <Nav.Link as={Button} onClick={logout}>Logout</Nav.Link> : location.pathname === '/register' ?  <Nav.Link as={Button} href="/login">Login</Nav.Link> : <Nav.Link as={Button} href="/register">Register</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}
