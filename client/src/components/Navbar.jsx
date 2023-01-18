import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl
} from "react-bootstrap";

function MainNav({ sendSortCondition, retrieveSearchTerm }) {
  const [condition, setCondition] = useState("type");
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    setCondition(event.target.name);
    event.preventDefault();
  }
  sendSortCondition(condition);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    retrieveSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Closet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Create Item</Nav.Link>
            <NavDropdown title="Sort By" id="basic-nav-dropdown">
              <NavDropdown.Item href="/" name="brand" onClick={handleChange}>
                Brand
              </NavDropdown.Item>
              <NavDropdown.Item href="/" name="color" onClick={handleChange}>
                Color
              </NavDropdown.Item>
              <NavDropdown.Item href="/" name="type" onClick={handleChange}>
                Type
              </NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
