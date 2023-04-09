import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
  
const CustomNavbar = () => { 
  return (
    <Navbar bg="light" expand="md" sticky="top">  
    <Container> 
        <Navbar.Brand href="#home">Bulletin Board</Navbar.Brand>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">  
            <Nav className="me-auto">  
            <Nav.Link href="/Home">Home</Nav.Link>  
            <Nav.Link href="/About">About</Nav.Link>  
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">  
                <NavDropdown.Item href="#action/3.1">Dropdown Item 1</NavDropdown.Item>  
                <NavDropdown.Item href="#action/3.2">Dropdown Item 2</NavDropdown.Item>  
                <NavDropdown.Item href="#action/3.3">Dropdown Item 3</NavDropdown.Item>  
                <NavDropdown.Divider />  
                <NavDropdown.Item href="#action/3.4">Another Item</NavDropdown.Item>  
            </NavDropdown>  
            </Nav>  
        </Navbar.Collapse>  
    </Container>  
  </Navbar>  
  );
}

export { CustomNavbar };

