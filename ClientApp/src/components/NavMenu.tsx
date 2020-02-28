import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const NavMenu = () => {
  return (
    <Navbar bg="dark" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand>FantasyStockTracker</Navbar.Brand>
        <Nav className="mr-auto" navbar>
          <Nav.Link>Home </Nav.Link>
          <Nav.Link>Details</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
