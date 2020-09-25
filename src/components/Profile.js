// show song list and track list with only your id as the owner id

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
import { Row, Col } from "reactstrap";

import 'antd/dist/antd.css';
import ReusableTrackForm from './ReusableTrackForm';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

const ColoredLine = ({ color1, color, text }) => (
  <h2
    style={{
      color: color1,
      backgroundColor: color,
      height: 50
    }}
  >{text}</h2>
);

const Profile = () => {
  const firestore = useFirestore();
  const [value, setValue] = useState(UserContext);
  const [trackList, setTrackList] = useState([])
  const [deleteBool, setDeleteBool] = useState(false);
  const [songList, setSongList] = useState([])
  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  // let trackRef = firestore.collection("tracks");

  // let myTracks = trackRef.where('owner', "==", firebase.auth.currentUser.uid);

  const getTrackList = () => {
    let data = [];
    let count = 0;
    firestore.collection("tracks").where("owner", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
          console.log(doc.id);
          console.log(data);
          count++;

        });

        setTrackList(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  const getSongList = () => {
    let data = [];
    let count = 0;
    firestore.collection("songs").where("owner", "==", auth.currentUser.uid).get()
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

  console.table(trackList);

  const changeList = () => {
    getTrackList();
    getSongList();
  }

  const setDelete = () => {
    console.log("setting delete bool");
    setDeleteBool(!deleteBool);
    getTrackList();
    getSongList();

  }

  useEffect(() => {
    console.log(context.state)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      changeList();
    }

  }, [context.state.user, deleteBool])

  return (
    <React.Fragment>
      {auth.currentUser ? "" : <Redirect to="/signin" />}
      {/* column */}
      {console.log("sheebs")}
      <Row>
        <Col>
          <ColoredLine color1="lightgoldenrodyellow" color="maroon" text="Your Tracks"></ColoredLine>
          <div className="your-tracks">
            <TrackList changeList={() => changeList} getTrackList={getTrackList} setDelete={setDelete} tracks={trackList} />
          </div>
        </Col>
        <Col>
          <ColoredLine color1="lightgoldenrodyellow" color="maroon" text="Your Songs"></ColoredLine>
          <div className="your-songs">


            <SongList changeList={() => changeList} setDelete={setDelete} songs={songList} fromHome={false} />
          </div>
        </Col>
      </Row>

      {console.log("screech")}
    </React.Fragment >
  );
}

export default withFirestore(Profile);
