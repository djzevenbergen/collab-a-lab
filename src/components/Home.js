
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

import { Jumbotron, Navbar, Nav, Col } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
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
  const [deleteBool, setDeleteBool] = useState(false);

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
  const changeList = () => {

    getSongList();
  }

  const setDelete = () => {
    console.log("setting delete bool");
    setDeleteBool(!deleteBool);
    changeList();
    getSongList();
  }

  useEffect(() => {
    console.log(context.state.user)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      changeList();
      setValue("");
      setValue(auth.currentUser);
    }

  }, [context.state.user])

  return (
    <React.Fragment>


      {user ? "" :
        <div>
          <h1>Welcome!</h1>
          <p>This is a work in progress.</p>
          <p>Make an account and start uploading tracks (one at a time for now)</p>
          <p>You can then create a song with any tracks that you have</p>
          <p>You can then go to the home page and look at other people's songs and listen to them</p>
          <p>If you want to mix a song, you can change the volume of individual tracks in the mixer but only before playing, you can then save.</p>
          <p>When you save and come back, you can then hear the changed levels</p>
          <p>If you want to add a track to another person's song, you just to need click propose track</p>
          <p>The owner can listen to the track and either accept or reject it</p>
        </div>}

      <div className="your-songs">
        <SongList changeList={() => changeList} songs={songList} fromHome={true} setDelete={setDelete} />
      </div>
      {console.log("screech")}
    </React.Fragment>
  );
}

export default withFirestore(Profile);
