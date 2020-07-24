import React, { useState, useContext } from "react";
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { message } from 'antd'
import SignUp from "./SignUp";


function SignIn() {

  const [hidden, setHidden] = useState(false);
  const [signup, setSignup] = useState(false);
  const { value, setValue } = useContext(UserContext);

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      message.success("you signed in");
      setHidden(!hidden);
      setValue(firebase.auth().currentUser);
      // let usernameTag = document.getElementById("username");
      // usernameTag.innerHTML = usernameTag.innerHTML.replace("", email);
    }).catch(function (error) {
      message.error(error.message);
    });
  }

  function onClick() {
    setSignup(!hidden);
  }

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      console.log("Successfully signed out!");
      setValue(null);
      // let usernameTag = document.getElementById("username");
      // usernameTag.innerHTML = "";
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <div className="main-container">

      {hidden ? <Redirect to="/profile" /> : ''}
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signInEmail'
          placeholder='Email' />
        <input
          type='password'
          name='signInPassword'
          placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
      <button onClick={onClick}>Sign Up</button>
      {signup ? <SignUp /> : ''}
      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign Out</button>
    </div>
  );

}

export default SignIn;