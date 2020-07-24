// show song list and track list with only your id as the owner id

import TrackList from './TrackList';
import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import SongList from './SongList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from './userContext';
import { MyContext } from "../context.js"

import 'antd/dist/antd.css';
import ReusableTrackForm from './ReusableTrackForm';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

const Profile = () => {
  const firestore = useFirestore();
  const [value, setValue] = useState(null);
  const [trackList, setTrackList] = useState([])
  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  // let trackRef = firestore.collection("tracks");

  // let myTracks = trackRef.where('owner', "==", firebase.auth.currentUser.uid);

  const getTrackList = () => {
    let data;
    firestore.collection("tracks").where("owner", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data()
        });

        setTrackList(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  console.table(trackList);

  useEffect(() => {
    console.log(context.state)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      getTrackList();
    }
    //
  }, [context.state.user])

  return (
    <React.Fragment>
      {/* column */}
      {console.log("sheebs")}
      <TrackList tracks={trackList} />
      {console.log("screech")}
    </React.Fragment>


  );
}

export default withFirestore(Profile);
