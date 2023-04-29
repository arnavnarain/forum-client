import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from 'aws-amplify';

import "./custom-navbar.scss"
import { ComponentClassNames } from '@aws-amplify/ui-react';

const CustomNavbar = (props) => {
  const username = Auth.user.username;
  return (
    <Navbar bg="light" expand="md" sticky="top">
      <Container>
        <Navbar.Brand href="/home">Bulletin Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/popular">Popular</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav" className={"dropdown"}>
          <NavDropdown title={username} id="basic-nav-dropdown">
            <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={props.signOut}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { CustomNavbar };

