import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';



export default function Track(props) {
  const { track, playTrack, stopTrack } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();

  const synth = new t.MembraneSynth().toMaster();
  // play a note with the synth we setup

  //dnd start
  // eslint-disable-next-line
  // const [{ isDragging }, drag] = useDrag({
  //   item: { track, type: "track", },
  //   end: async (item, monitor) => {
  //     const dropResult = monitor.getDropResult()
  //     if (item && dropResult && dragProp === "list") {
  //       await event(track);

  //     }
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // })
  //dnd end
  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])


  return (
    <>
      {console.log(track.name)}

      {
        user ?
          <div className="track-box">
            <Card>

              <CardBody>
                <CardTitle>Name : {track.name}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button onClick={() => playTrack(track.url)}>Play</Button>
                <Button onClick={() => stopTrack()}>Stop</Button>
              </CardBody>
            </Card>


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