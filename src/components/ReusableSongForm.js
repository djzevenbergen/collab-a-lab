import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context";
import { UserContext } from "./userContext";
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
import { v4 } from 'uuid';
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
  const [value, setValue] = useState(UserContext);
  const [trackList, setTrackList] = useState([])
  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  let tempId;


  const [hidden, setHidden] = useState(true);
  let storageRef;

  if (firebase.auth().currentUser === null) {
    setHidden(false);
  }


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

  console.table(trackList);

  useEffect(() => {

    setUser(auth.currentUser)
    if (auth.currentUser) {
      getTrackList();
    }
    //
  }, [auth.currentUser])

  function addStuffToFirestore(event) {
    event.preventDefault();
    tempId = v4();
    createDefaultMixSettings(tempId);
    return firestore.collection('songs').add(
      {
        name: event.target.name.value,
        owner: auth.currentUser.uid,
        bpm: event.target.bpm.value,
        songId: tempId,
        track1: event.target.track1.value,
        track2: event.target.track2.value,
        track3: event.target.track3.value,
        track4: event.target.track4.value,
        track5: event.target.track5.value,
        track6: event.target.track6.value,
        track7: event.target.track7.value,
        track8: event.target.track8.value,
        timeCreated: firestore.FieldValue.serverTimestamp()
      });
  }

  function createDefaultMixSettings(songId) {
    return firestore.collection('songSettings').add(
      {
        songId: songId,
        vol1: 50,
        vol2: 50,
        vol3: 50,
        vol4: 50,
        vol5: 50,
        vol6: 50,
        vol7: 50,
        vol8: 50

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
                <label>
                  BPM:
          <input type="number" name="bpm" id="bpm" />
                </label>
              </li>
              <li>
                <label>


                  <select defaultValue={null} name="track1" id="track1">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>

                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track2" id="track2">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track3" id="track3">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track4" id="track4">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track5" id="track5">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track6" id="track6">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                  <select defaultValue={null} name="track7" id="track7">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>
                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </label>
              </li>
              <li>
                <label>

                </label>
                <select defaultValue={null} name="track8" id="track8">
                  {console.table(trackList)}
                  <option value={null}>Choose a track</option>
                  {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                </select>
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