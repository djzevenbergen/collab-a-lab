import React, { useState } from "react";
import firebase from 'firebase/app';
import { useFirestore } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { message } from 'antd'



function SignUp() {

  const [hidden, setHidden] = useState(true);

  const firestore = useFirestore();
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
      console.log(data.user.uid);
      message.success("successfully signed up!");
      setHidden(!hidden);
      return firestore.collection("users").add({ userId: data.user.uid, userName: data.user.email, liked: [] });

    }).catch(function (error) {
      console.log(error.message);
    });
  }




  return (
    <>
      {hidden ? '' : <Redirect to="/" />}
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
    </>

  )

}

export default SignUp;