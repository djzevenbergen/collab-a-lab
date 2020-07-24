//login/logout/signup, main list, my profile
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';
import { UserContext } from './userContext';

export default function Header(props) {
  const { value, setValue } = useContext(UserContext);
  const Header = styled.section`
  background-color: ${props.theme.secondary};
  `;
  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  // if (auth.currentUser) {
  //   setValue(auth.currentUser);
  // }

  //dnd end
  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  return (
    <>
      <Header>
        <div className="header">
          {/* {value ? <p>{value.email}</p> : <p>Not logged in</p>} */}
          <Link to="/signin">Sign in</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/addtrack">Add track</Link>
          <Link to="/">Home</Link>

        </div>
      </Header>

    </>
  )
}