// show song list and track list with only your id as the owner id

import Profile from './TrackList';
import React, { useState } from 'react';
import Header from './Header';
import SongList from './SongList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from './userContext';

import 'antd/dist/antd.css';
import ReusableTrackForm from './ReusableTrackForm';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

function Profile() {
  const firestore = useFirestore();
  const [value, setValue] = useState(null)

  let trackRef = firestore.collection("tracks");

  let myTracks = trackRef.where('owner', "==", firebase.auth.currentUser.uid);

  console.log("whatup" + myTracks);


  return (
    <React.Fragment>
      {/* column */}
      {console.log("sheebs")}
      <TrackList tracks={myTracks} />
    </React.Fragment>


  );
}

export default withFirestore(Profile);