import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">MERN Ecomm</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/cart">
                  <i class="fas fa-shopping-cart"></i> Cart
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/auth">
                  <i class="fas fa-sign-in-alt"></i> Sign In
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
