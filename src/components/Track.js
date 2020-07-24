import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";



export default function Track(props) {
  const { track, event } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();
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
            < h2 > {track.name}</h2 >

            <p><strong>Ingedients:</strong> {track.ingredients}</p>
            <p><strong>Instructions: </strong>{track.details}</p>
            <h3>Category: {track.category}</h3>
          </div >
          :
          <div className="track-box">
            <h2>{track.name}</h2>
            <p>{track.details}</p>
            <h3>category: {track.category}</h3>
          </div>
      }
    </>
  )
}