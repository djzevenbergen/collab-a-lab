//shows- song name, owner name, how many tracks are open, if open to collab, date created
//has on click to take you to the songdashboard
import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import PropTypes from "prop-types";
import { UserContext } from './userContext';


export default function Song(props) {
  const { song, selectSong, fromHome } = props;
  const [user, setUser] = useState(null);
  const { value, setValue } = useContext(UserContext);

  const auth = firebase.auth();

  const synth = new t.MembraneSynth().toDestination();
  // play a note with the synth we setup


  useEffect(() => {
    setUser(auth.currentUser);
    setValue(auth.currentUser)
  }, [auth])


  return (
    <>
      {console.log(song.name)}

      {
        user ?
          <div className="song-box" style={{ border: "1px solid black" }}>

            < h2 >{song.name}</h2 >
            <h2>by: {song.username}</h2>
            <button onClick={() => selectSong(song)}>Details</button>
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
