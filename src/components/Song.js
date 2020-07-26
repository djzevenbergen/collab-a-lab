//shows- song name, owner name, how many tracks are open, if open to collab, date created
//has on click to take you to the songdashboard
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import PropTypes from "prop-types";


export default function Song(props) {
  const { song, selectSong } = props;
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
      {console.log(song.name)}

      {
        user ?
          <div className="song-box">

            < h2 onClick={() => selectSong(song)}>Name : {song.name}</h2 >
          </div >
          : ""

      }
    </>
  )
}

Song.propTypes = {
  tracks: PropTypes.object,
  song: PropTypes.object
};
