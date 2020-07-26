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
import { withFirestore, useFirestore } from 'react-redux-firebase';
import Track from "./Track";
import TrackList from "./TrackList";


function SongDashboard(props) {
  const { song } = props;
  const [user, setUser] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const firestore = useFirestore();

  const auth = firebase.auth();

  const getTrackList = () => {
    let data = [];
    let count = 0;
    for (let i = 1; i <= 8; i++) {


      firestore.collection("tracks").where("trackId", "==", song["track" + i.toString()]).get()
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

  }

  useEffect(() => {
    setUser(auth.currentUser)
    getTrackList();

  }, [auth])

  return (
    <>


      {
        user ?
          <div className="song-box">

            {song ? <div>
              < h2 >Name : {song.name}</h2 >
              {console.log(typeof (trackList))}
              {trackList ?
                (Object.values(trackList).map((track, i) =>
                  < div >
                    {console.log(trackList[i])}
                    {console.log(trackList[i + 1])}
                    <p>{i}</p>
                    <Track key={i} track={trackList[i]} />

                  </div>

                ))

                :
                "nothing yet"
              }
              {/* 
              <h2>Track 1: {song.track1}</h2>
              <h2>Track 2: {song.track2}</h2>
              <h2>Track 3: {song.track3}</h2>
              <h2>Track 4: {song.track4}</h2>
              <h2>Track 5: {song.track5}</h2>
              <h2>Track 6: {song.track6}</h2>
              <h2>Track 7: {song.track7}</h2>
              <h2>Track 8: {song.track8}</h2> */}

            </div>

              : ""}
          </div >
          : ""

      }

      <div>

      </div>

    </>
  )
}

SongDashboard.propTypes = {
  song: PropTypes.object
};

export default withFirestore(SongDashboard);
