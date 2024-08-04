import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CustomNavbar() {
  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("Logout Successful");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/url-shortner">
            <i className="fas fa-link me-2"></i>
            URL Shortener
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler">
            <i className="fas fa-bars"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/url-shortner" className="mx-2">
                <i className="fas fa-compress me-2"></i>
                Shorten URL
              </Nav.Link>
              <Nav.Link as={Link} to="/url-shortner/url-list" className="mx-2">
                <i className="fas fa-list me-2"></i>
                URL List
              </Nav.Link>
              <Nav.Link as={Link} to="/url-shortner/dashboard" className="mx-2">
                <i className="fas fa-chart-bar me-2"></i>
                URL Count
              </Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleLogout} className="mx-3">
                <i className="fas fa-sign-out-alt me-2"></i>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default CustomNavbar;
