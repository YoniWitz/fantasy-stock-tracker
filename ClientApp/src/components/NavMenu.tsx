import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { HoldingForm } from './holdings/form/HoldingForm';
import { IHolding } from '../app/models/IHolding';

interface IProps {
  handleCreateSubmit: (holding: IHolding) => void;
  setSelectedHolding: (holding: IHolding) => void;
}
export const NavMenu: React.FC<IProps> = ({ handleCreateSubmit, setSelectedHolding }) => {
  let [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Navbar fixed='top'>
      <Container>
        <Navbar.Brand>Fantasy Stock Tracker</Navbar.Brand>
        <Nav className="mr-auto" navbar>
          <Nav.Link>Home</Nav.Link>
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
      </Container>
    </Navbar>
  )
}
