

import React, { useState, useEffect, useContext } from 'react';

import { Jumbotron, Navbar, Nav, Col } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

const Footer = (props) => {

  return (
    <React.Fragment>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand>Collabulous</Navbar.Brand>

      </Navbar>

    </React.Fragment>

  );
}

export default Footer;