import React, { useState } from "react";
import firebase from 'firebase/app';
import { useFirestore } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { message } from 'antd'



function SignUp() {

  const [hidden, setHidden] = useState(true);

  const firestore = useFirestore();
  async function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userName = event.target.userName.value;

    let userNameList = [];
    await firestore.collection("usernames").where("username", "==", userName).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userNameList.push(doc.data().username);
          console.log(doc.id);
          console.log(doc.data().username);


        })
      })

    console.log(userNameList[0])
    if (userNameList[0] != (userName)) {


      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
        console.log(data.user.uid);
        message.success("successfully signed up!");
        setHidden(!hidden);


        AddUserToDb(data, userName);
        AddUsername(data, userName)

      }).catch(function (error) {
        console.log(error.message);
      });
    } else {
      message.error("username already taken");
    }
  }

  const AddUsername = (data, uName) => {


    return firestore.collection("usernames").add({ username: uName, userId: data.user.uid });
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