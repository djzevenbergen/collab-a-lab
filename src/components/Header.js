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

  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  if (auth.currentUser) {
    setValue(auth.currentUser);
  }
  console.log("hi");
  //dnd end
  useEffect(() => {
    console.log(auth.currentUser)
    // console.log(context.state)
    setUser(auth.currentUser)
  }, [auth.currentUser])

  function reloadToHome() {
    if ((window.location.href).endsWith("3000/") || (window.location.href).endsWith("app/")) {
      window.location.reload();
    } else {
      window.location = 'http://localhost:3000/';
    }

    console.log("reload");
    return false;
  }

  function gitHubRepo() {
    window.location = 'https://github.com/tytyhibye/Shrug';
  }

  return (
    <React.Fragment>
      <Navbar variant='dark' bg="dark" expand='lg'>
        <Navbar.Brand>Collabulous</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link> <Link className='navLink1' to="/signin">{user ? "Sign Out" : "Sign in"}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink2' to="/profile">Profile</Link></Nav.Link>
            <Nav.Link> <Link className='navLink3' to="/addtrack">{auth.currentUser ? "Add track" : ""}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink4' to="/addsong">{auth.currentUser ? "New Song" : ""}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink5' id="home" onClick={reloadToHome}>Home</Link></Nav.Link>
            <Nav.Link> <Link className='navLink6' id="home" onClick={gitHubRepo}><img className="ghIcon" src="https://i.ibb.co/MhpKckw/gh-icon-white.png" alt="gh-icon" />  GitHub for this Project</Link></Nav.Link>
            {/* <Nav.Link> <Link id="home" className='navLink' to="/">GitHub for this Project</Link></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </React.Fragment>

  );
}

export default Header;