//login/logout/signup, main list, my profile
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';
import { UserContext } from './userContext';
import MyContext from '../context.js';
import { Jumbotron, Navbar, Nav } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  const { value, setValue } = useContext(UserContext);
  const context = useContext(MyContext);


  // const Header = styled.section`
  // background-color: ${props.theme.secondary};
  // `;

  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  if (auth.currentUser) {
    setValue(auth.currentUser);
  }

  //dnd end
  useEffect(() => {
    console.log(auth.currentUser)
    // console.log(context.state)
    setUser(auth.currentUser)
  }, [auth])

  return (
    <React.Fragment>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand>Collabulous</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">

            <Nav.Link> <Link className='navLink' to="/signin">{user ? "Sign Out" : "Sign in"}</Link></Nav.Link>

            <Nav.Link> <Link className='navLink' to="/profile">Profile</Link></Nav.Link>
            <Nav.Link> <Link className='navLink' to="/addtrack">{auth.currentUser ? "Add track" : ""}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink' to="/addsong">{auth.currentUser ? "New Song" : ""}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink' to="/">Home</Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </React.Fragment>

  );
}

export default Header;