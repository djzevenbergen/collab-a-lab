//login/logout/signup, main list, my profile

import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';
// import { UserContext } from './userContext';

export default function Header() {
  // const { value, setValue } = useContext(UserContext);
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
      <div className="header">
        {/* {value ? <p>{value.email}</p> : <p>Not logged in</p>} */}
        <Link to="/signin">Sign in</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>

      </div>
    </>
  )
}