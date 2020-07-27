
import TrackList from './TrackList';
import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import SongList from './SongList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
  const [value, setValue] = useState(UserContext);
  const [songList, setSongList] = useState([])

  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  // let trackRef = firestore.collection("


  const getSongList = () => {
    let data = [];
    let count = 0;
    firestore.collection("songs").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
          console.log(doc.id);
          console.log(data);
          count++;

        });

        setSongList(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


  useEffect(() => {
    console.log(context.state)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      getSongList();
      setValue(auth.currentUser);
    }

  }, [context.state.user])

  return (
    <React.Fragment>
      <SongList songs={songList} fromHome={true} />
      {console.log("screech")}
    </React.Fragment>


  );
}

export default withFirestore(Profile);
