// if logged in and owner of song, you can edit volumes, see requests, and approve/delete collabs
//if logged out, you can upload one file
// if there is already a pending transaction for this song, you can't upload anything
// can listen to individual tracks or all tracks at once
// can export whole song as anyone


import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";
import PropTypes from "prop-types";


export default function SongDashboard(props) {
  const { song } = props;
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


      {
        user ?
          <div className="song-box">

            {song ? <div>
              < h2 >Name : {song.name}</h2 >

              <h2>Track 1: {song.track1}</h2>
              <h2>Track 2: {song.track2}</h2>
              <h2>Track 3: {song.track3}</h2>
              <h2>Track 4: {song.track4}</h2>
              <h2>Track 5: {song.track5}</h2>
              <h2>Track 6: {song.track6}</h2>
              <h2>Track 7: {song.track7}</h2>
              <h2>Track 8: {song.track8}</h2>

            </div>


              : ""}
          </div >
          : ""

      }
    </>
  )
}

SongDashboard.propTypes = {
  song: PropTypes.object
};
