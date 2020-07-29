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
    const userName = event.target.userName.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
      console.log(data.user.uid);
      message.success("successfully signed up!");
      setHidden(!hidden);
      checkUsername(userName, data);
      AddUserToDb(data, userName);

    }).catch(function (error) {
      console.log(error.message);
    });
  }


  const checkUsername = (uName, data) => {
    try {
      let userNameList = [];
      firestore.collection("usernames").where("username", "==", uName).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            userNameList.push(doc.data().username);
            console.log(doc.id);
            console.log(doc.data().username);


          })
        })

      if (userNameList.includes(uName)) {
        throw ("this username is take");
      }
      else {
        return firestore.collection("usernames").add({ username: uName, userId: data.user.uid });
      }


    } catch (error) {
      message.error(error.message);
    }


  }

  const AddUserToDb = (data, userName) => {
    try {
      return firestore.collection("users").add({ userId: data.user.uid, email: data.user.email, username: userName, tracks: [] });
    } catch (error) {
      message.error(error.message)
    }
  }


  return (
    <>
      {hidden ? '' : <Redirect to="/" />}
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='userName'
          placeholder='userName' />
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