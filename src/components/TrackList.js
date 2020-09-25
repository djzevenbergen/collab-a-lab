import React, { useState, useEffect } from 'react';
import axios from "axios";
import Track from "./Track";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Song from "./Song";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";
import * as t from "tone";
import { Card } from 'reactstrap';


export default function TrackList(props) {
  const { tracks, changeList, getTrackList, setDelete } = props;

  const [songList, setList] = useState(null);
  const [favePage, goToFaves] = useState(false);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const firestore = useFirestore();
  let player;


  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  console.log(tracks);


  let trackPlayers = {}
  const onClickTrack = (trackId, name) => {
    if (!trackPlayers[trackId]) {
      var storage = firebase.storage();
      var pathReference = storage.ref('tracks/')

      pathReference.child(`${name}`).getDownloadURL().then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        console.log("1");
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        console.log("2");
        xhr.responseType = 'blob';
        console.log("3");
        xhr.onload = function (event) {
          event.preventDefault();

          var blob = xhr.response;
          console.log(blob);
        };
        console.log("4");
        xhr.open('GET', url);
        console.log("5");
        xhr.send();
        console.log("6");
        trackPlayers[trackId] = new t.Player(url).toDestination();
        trackPlayers[trackId].autostart = true;

      }).catch(function (error) {
        console.log('error downloading');
      });
    } else {

      trackPlayers[trackId].start()

    }

  }

  function onClickStop(trackId) {
    trackPlayers[trackId].stop();
  }

  const deleteTrack = (thisId) => {
    let empId;
    async function getTrackId(thisId) {
      let tempId;
      await firestore.collection("tracks").where("trackId", "==", thisId).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {

            tempId = doc.id;
          })
        })
      console.log(tempId);
      empId = tempId;
      deleteThisTrack(empId);
      setDelete();
    }
    getTrackId(thisId);



  }

  const deleteThisTrack = (empId) => {
    return firestore.delete({ collection: 'tracks', doc: empId })
  }

  return (

    <div className="main-container">
      <div className="track-container">
        <div className="track-box">
          <h2></h2>

        </div>
        <Card>
          {props.tracks ? Object.values(props.tracks).map((track, i) => <Track key={i} track={track} dragProp="list" canDelete={false} stopTrack={onClickStop} playTrack={onClickTrack} changeList={changeList} deleteTrack={deleteTrack} />) : ''}
        </Card>
      </div>


    </div >

  );


}
TrackList.propTypes = {
  tracks: PropTypes.object
};


