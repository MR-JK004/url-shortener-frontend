import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(prev => !prev); 
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("Logout Successful");
  };

  return (
    <MDBNavbar expand='lg' dark bgColor='primary'>
      <MDBNavbarBrand>
        <MDBIcon fas icon="link" className="me-2" style={{ marginLeft: '10%' }} />
        URL Shortener
      </MDBNavbarBrand>
      <MDBNavbarToggler aria-controls='navbarCollapse' aria-expanded={isOpen} aria-label='Toggle navigation' onClick={toggleCollapse}>
        <MDBIcon fas icon='bars' />
      </MDBNavbarToggler>
      <MDBCollapse navbar show={isOpen}>
        <MDBNavbarNav className='mb-2 mb-lg-0' style={{ marginLeft: '145%' }}>
          <MDBNavbarItem style={{marginRight:'20px'}}>
            <Link className="nav-link" to="/url-shortner">
              <MDBIcon fas icon="compress" className="me-2" />
              Shorten URL
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem style={{marginRight:'20px'}}>
            <Link className="nav-link" to="/url-shortner/url-list">
              <MDBIcon fas icon="list" className="me-2" />
              URL List
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem style={{marginRight:'20px'}}>
            <Link className="nav-link" to="/url-shortner/dashboard">
              <MDBIcon fas icon="chart-bar" className="me-2" />
              URL Count
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem className='me-5'>
            <Link className="nav-link" to={'/login'} onClick={()=>handleLogout()}>
              <MDBIcon fas icon="sign-out-alt" className="me-2" />
              Log Out
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default Navbar;
