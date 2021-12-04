import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../redux/actions/userActions";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import SearchBox from "./SearchBox";

const Header = () => {
  const {userInfo} = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">Easy Buy</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <NavbarCollapse id="navbarScroll">
            <Nav className="mx-auto">
            <SearchBox />
              <Nav.Link>
                <Link to="/cart">
                  <i class="fas fa-shopping-cart"></i> Cart
                </Link>
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item>
                    <Link to="/profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick = {handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link>
                <Link to="/auth">
                  <i class="fas fa-sign-in-alt"></i> Sign In
                </Link>
                </Nav.Link>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
