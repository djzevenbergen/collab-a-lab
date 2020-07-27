//shows- song name, owner name, how many tracks are open, if open to collab, date created
//has on click to take you to the songdashboard
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import PropTypes from "prop-types";


export default function Song(props) {
  const { song, selectSong, fromHome } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();

  const synth = new t.MembraneSynth().toDestination();
  // play a note with the synth we setup


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
  song: PropTypes.object,
  fromHome: PropTypes.bool
};
