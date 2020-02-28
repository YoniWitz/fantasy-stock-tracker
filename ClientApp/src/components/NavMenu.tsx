import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const NavMenu = () => {
  return (
    <Navbar bg="dark" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand>FantasyStockTracker</Navbar.Brand>
        <Nav color="white" className="mr-auto" navbar>
          <Nav.Link>Home </Nav.Link>
          <Nav.Link>Counter</Nav.Link>
          <Nav.Link>Fetch data</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
