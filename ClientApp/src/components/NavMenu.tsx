import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { HoldingForm } from './holdings/form/HoldingForm';
import { IHolding } from '../app/models/IHolding';
import { IUser } from '../app/models/IUsers';

interface IProps {
  user: IUser | null;
  handleCreateSubmit: (holding: IHolding) => Promise<unknown>;
  setSelectedHolding: (holding: IHolding) => void;
}
export const NavMenu: React.FC<IProps> = ({ handleCreateSubmit, setSelectedHolding, user }) => {
  let [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand href="#home">Fantasy Stock Tracker</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/holdings">Holdings</Nav.Link>
          <Nav.Link>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Create Holding
            </Button>
            <Modal show={showModal} size="sm" onHide={() => setShowModal(false)}
              aria-labelledby="example-modal-sizes-title-sm"
              centered>
              <Modal.Header closeButton>
                <Modal.Title>Create new Holding</Modal.Title>
              </Modal.Header>
              <HoldingForm setSelectedHolding={setSelectedHolding} handleSubmit={handleCreateSubmit} formHolding={null} onCancelForm={setShowModal} />
            </Modal>
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Navbar.Text>Hello {user? user.displayName : 'Guest'}</Navbar.Text>
          {user && <Nav.Link >Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}
