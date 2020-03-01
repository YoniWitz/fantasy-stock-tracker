import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { HoldingForm } from './holdings/form/HoldingForm';

export const NavMenu = () => {
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
            <Modal show={showModal} size="sm"
              aria-labelledby="example-modal-sizes-title-sm"
              centered>
              <HoldingForm onCancelForm={setShowModal} />
            </Modal>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
