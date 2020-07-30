import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';



export default function Track(props) {
  const { track, playTrack, stopTrack, changeList, deleteTrack } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();

  const deleteThisTrack = (id) => {
    console.log(id);
    deleteTrack(id);
    changeList();
  }

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])


  return (
    <>
      {console.log(track.name)}

      {
        user ?
          <div className="track-box">


            <CardBody>
              <CardTitle>Name : {track.name}</CardTitle>
              <CardSubtitle>Author: {track.username}</CardSubtitle>
              <CardText>BPM: {track.bpm} Description: {track.description}</CardText>
              <Button onClick={() => playTrack(track.url)}>Play</Button>
              <Button onClick={() => stopTrack()}>Stop</Button>
              <Button onClick={() => deleteThisTrack(track.trackId)}>Delete</Button>
            </CardBody>



          </div >
          :
          <div className="track-box">
            <h2>Name : {track.name}</h2>
            <p>{track.details}</p>
            <h3>category: {track.category}</h3>
          </div>
      }
    </>
  )
}