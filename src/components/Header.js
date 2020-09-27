//login/logout/signup, main list, my profile
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';
import { UserContext } from './userContext';
import MyContext from '../context.js';
import { Navbar, Nav } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

const navImg = {
  width: "110px",
};

const navColor = {
  backgroundColor: "rgb(0, 50, 0)",
}

const HeaderLogged = styled.h2`
  color: gray;
  font-size: small;
`;

const Header = (props) => {
  const { value, setValue } = useContext(UserContext);
  const context = useContext(MyContext);

  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  if (auth.currentUser) {
    setValue(auth.currentUser);
  }

  //dnd end
  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth.currentUser])

  function reloadToHome() {
    if ((window.location.href).includes("3000") || (window.location.href).endsWith("app/")) {
      window.location = "http://localhost:3000/"
    } else {
      window.location = 'https://collab-a-lab.web.app/';
    }

    return false;
  }

  function gitHubRepo() {
    window.location = 'https://github.com/djzevenbergen/collab-a-lab';
  }

  return (
    <React.Fragment>
      <Navbar style={navColor} variant='dark' expand='lg'>
        <Navbar.Brand><a href="http://localhost:3000/"><img href="" style={navImg} src="https://i.ibb.co/FJ4Lw2R/b519fcb3-7a98-4b34-be27-6237d07c2966-200x200.png" alt="logo" /></a></Navbar.Brand>
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
      <HeaderLogged>{user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}</HeaderLogged>
    </React.Fragment>

  );
}

export default Header;