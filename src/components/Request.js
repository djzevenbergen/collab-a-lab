import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { withFirestore, useFirestore } from 'react-redux-firebase';



export default function Request(props) {
  const { request, setRequest, rejectRequest, onPlaySongWithRequest, playRequestTrack, stopPlayers, onPlaySong, acceptRequest } = props;
  const [user, setUser] = useState(null);
  const [track, setTrack] = useState(null);
  const firestore = useFirestore();
  const auth = firebase.auth();


  useEffect(() => {
    setUser(auth.currentUser);
    getTrack();
  }, [request])


  const getTrack = () => {
    let data;
    let count = 0;
    firestore.collection("tracks").where("trackId", "==", request.trackId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data();

        });

        setTrack(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  // <Request request={requestList} setRequest={setRequest} 
  // onPlaySongWithRequest={onPlaySongWithRequest} 
  // playRequestTrack={playRequestTrack} stopPlayers={stopPlayers} />
  return (
    <>

      {
        track ?
          <div className="track-box">
            <Card>

              <CardBody>
                <CardTitle>Name : {track.name}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button onClick={() => playRequestTrack(track)}>Play Track</Button>
                <Button onClick={() => onPlaySongWithRequest(track)}>Play Song With Track</Button>
                <Button onClick={() => onPlaySong()}>Play Song Without Track</Button>
                <Button onClick={() => stopPlayers()}>Stop</Button>
                <Button onClick={() => rejectRequest(request.requestId)}>Reject Track</Button>
                <Button onClick={() => acceptRequest(request.trackId, request.songId, request.requestId)}>Accept Track</Button>
              </CardBody>
            </Card>


          </div >
          :
          ""
      }
    </>
  )
}