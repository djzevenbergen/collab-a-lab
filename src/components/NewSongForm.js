import React, { useState } from "react";

import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { render } from "@testing-library/react";
import styled from "styled-components";
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { connect } from "react-redux";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
// import history from '../history';


const IntroContainer = styled.section`
  margin: 0 auto;
  padding: 150px 0;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ReusableTrackForm(props) {

  const firestore = useFirestore();

  const auth = firebase.auth();

  const [hidden, setHidden] = useState(true);
  let storageRef;

  if (firebase.auth().currentUser === null) {
    setHidden(false);
  }

  let file = {};
  const onFileChange = (event) => {

    // Update the state 
    file = event.target.files[0];
  }

  console.log("file" + file);

  function addStuffToFirestore(event) {
    event.preventDefault();
    console.log("file" + file)
    const fileType = event.target.track.type;
    console.log(fileType);
    const metadata = {
      contentType: fileType
    }
    var blob = new Blob([file], { type: fileType });
    storageRef = firebase.storage().ref('tracks/' + file.name);
    const uploadTask = storageRef.put(blob, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload Progress: ' + progress);
      }, function (error) {
        console.log(error);
        switch (error.code) {
          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            console.log("User canceled the upload");
            break;
          case 'storage/unknown':
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      });

    return firestore.collection('songs').add(
      {
        name: event.target.name.value,
        url: file.name,
        owner: auth.currentUser.uid,

        timeCreated: firestore.FieldValue.serverTimestamp()
      }
    );
  }


  return (
    <React.Fragment>
      {hidden ?
        <IntroContainer>

          <form onSubmit={addStuffToFirestore}>
            <ul>
              <li>
                <label>
                  Title or Name:
          <input type="text" name="name" id="name" />
                </label>
              </li>

              <li>
              </li>
              <li>
                <label>
                  Track:
            <input type="file" name="track" id="track" onChange={onFileChange} />
                </label>
              </li>

            </ul>
            <button type="submit">Update</button>
          </form>
        </IntroContainer>
        : <Redirect to="/signin" />}


    </React.Fragment >
  );
}


export default withFirestore(ReusableTrackForm);