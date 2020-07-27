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
  const { song, songSelect, fromHome } = props;
  const [user, setUser] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const firestore = useFirestore();
  const [dropdown, showDropdown] = useState(false);

  const auth = firebase.auth();

  const getTrackList = () => {
    let data = [];
    let count = 0;

    firestore.collection("tracks").where("owner", "==", auth.currentUser.uid).get()
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

  const openTrackDropDown = () => {
    showDropdown(true);
  }

  useEffect(() => {
    setUser(auth.currentUser)
    getTrackList();

  }, [auth])

  let player;
  async function onPlaySong() {
    var storage = firebase.storage();
    var pathReference = storage.ref('tracks/')
    await trackList.forEach((track) => {
      pathReference.child(`${track.url}`).getDownloadURL().then(function (url) {
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
        player = new t.Player(url).toMaster();
        //play as soon as the buffer is loaded
        player.autostart = true;

      }).catch(function (error) {
        console.log('error downloading');
      });

    })

  }


  trackList.forEach((track, i) => {
    console.log(track.name + " " + i);
  });

  return (
    <>
      {
        user ?
          <div className="song-dash">

            {song ? <div>
              < h2 >Name : {song.name}</h2 >
              <button onClick={songSelect}>Go Back</button>
              <button onClick={onPlaySong}>Play Song</button>
              {(fromHome && song.owner != user.uid) ? <button onClick={openTrackDropDown}>Propose New Track</button> : <button onClick={openTrackDropDown}>Add New Track</button>}
              {dropdown ?
                <div>
                  <select defaultValue={null} name="track1" id="track1">
                    {console.table(trackList)}
                    <option value={null}>Choose a track</option>

                    {trackList ? trackList.map((track) => { return <option value={track.trackId}>{track.name}</option> }) : ""}

                  </select>
                </div>
                : ""}
              {console.log(typeof (trackList))}
              {console.table(trackList)}
              <div>
                <ul>
                  {trackList ?
                    trackList.forEach((track, i) => {
                      return (
                        <React.Fragment>
                          <li>
                            <div>
                              {console.log("thisthatfiretrack" + track.name)}
                              <p>Hello</p>
                              <p>{i}</p>
                              <p>{track.name}</p>
                              {/* <Track key={i} track={track} /> */}

                            </div>
                          </li>
                        </React.Fragment>)
                    })

                    :
                    "nothing yet"
                  }
                </ul>
              </div>

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

    </>
  )
}

SongDashboard.propTypes = {
  song: PropTypes.object
};

export default withFirestore(SongDashboard);
