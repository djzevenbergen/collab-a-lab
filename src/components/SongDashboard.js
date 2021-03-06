// if logged in and owner of song, you can edit volumes, see requests, and approve/delete collabs
//if logged out, you can upload one file
// if there is already a pending transaction for this song, you can't upload anything
// can listen to individual tracks or all tracks at once
// can export whole song as anyone


import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import { message } from 'antd';
import { v4 } from "uuid";
import * as t from "tone";
import PropTypes from "prop-types";
import { withFirestore, useFirestore } from 'react-redux-firebase';
import Track from "./Track";
import TrackList from "./TrackList";
import { Redirect } from 'react-router-dom';
import Request from "./Request";
import MixerEditor from './MixerEditor';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';


function SongDashboard(props) {
  const { song, songSelect, fromHome, selectSong, deleteSong, changeTempSong } = props;
  const [user, setUser] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [songTracks, setSongTracks] = useState([]);
  const firestore = useFirestore();
  const [dropdown, showDropdown] = useState(false);
  const [ownerBool, setOwnerBool] = useState(false);
  const [requestList, setRequest] = useState([]);
  const [thisId, setId] = useState(null);
  const [mixerVisible, toggleMixer] = useState(false);
  const [effects, setEffects] = useState([]);
  const [rerenderCount, rerenderCounter] = useState(0);
  const [requestBool, setRequestBool] = useState(false);
  const auth = firebase.auth();

  const getTrackList = () => {
    let data = [];
    let count = 0;

    firestore.collection("tracks").where("owner", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
          // console.log(doc.id);
          // console.log(data);
          count++;

        });


        setTrackList(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  }

  async function getSongTrackList() {
    let data = [];
    let count = 0;
    for (let i = 1; i <= 8; i++) {

      await firestore.collection("tracks").where("trackId", "==", song['track' + i]).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data());
            // console.log(doc.id);
            // console.log(data);
            count++;

          });


        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    setSongTracks(data);
  }

  const openTrackDropDown = () => {
    showDropdown(true);
  }

  const changeOwnerBool = () => {
    setOwnerBool(song.owner == auth.currentUser.uid)
  }

  const checkRequests = () => {
    let data = [];
    firestore.collection("requests").where("songId", "==", song.songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
          // console.log(doc.id);
          // console.log(data);


        });

        setRequest(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


  async function getEffects() {
    let data;
    await firestore.collection("songSettings").where("songId", "==", song.songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data();
          // console.log(doc.id);
          // console.log(data);


        });

        setEffects(data);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


  useEffect(() => {
    setUser(auth.currentUser)
    getTrackList();
    changeOwnerBool();
    checkRequests();
    getSongId(song.songId);
    getSongTrackList();
    getEffects();

  }, [auth, requestBool])

  const getSongId = (songId) => {
    firestore.collection("songs").where("songId", "==", songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setId(doc.id);

        });

      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }

  let player;
  let players = new t.Players().toDestination();
  let playObj = {}
  async function onPlaySong() {
    if (Object.keys(playObj).length === 0 && playObj.constructor === Object) {

      var storage = firebase.storage();
      var pathReference = storage.ref('tracks/')
      // console.log(trackList);

      let i = 0
      await songTracks.forEach((track) => {
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
          xhr.open('GET', "https://cors-anywhere.herokuapp.com/" + url);
          console.log("5");
          xhr.send();
          console.log("6");
          playObj["player" + i] = new t.Player(url).toDestination();
          playObj["player" + i].autostart = true;
          i++;

        }).catch(function (error) {
          console.log('error downloading');
        });
      })
    } else {
      Object.values(playObj).forEach((ind) => {
        ind.start()
      })
    }
  }

  const submitRequest = (event) => {
    event.preventDefault();
    if (ownerBool) {
      // console.log("yours", event.target.track1.value, song.songId)
      updateSong(event.target.track1.value, song.songId);
    } else {
      // console.log("not yours", event.target.track1.value, song.songId)
      createRequest(event.target.track1.value, song.songId)
    }
  }

  const rejectRequest = (rejectId) => {
    console.log(rejectId);
    let tempId = [];
    let count = 0;
    firestore.collection("requests").where("requestId", "==", rejectId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          console.log(doc);
          tempId.push(doc.id);
          if (count == 0) {
            deleteThisRequest(doc.id);
          }

          console.log(tempId[0]);
          count++;

        });

      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
    console.log(tempId[0]);
    changeTempSong(song);
    checkRequests();
    booboo();

  }

  const booboo = () => {

    setRequestBool(!requestBool);
  }

  const deleteThisRequest = (id) => {

    console.log(id);

    return firestore.delete({ collection: 'requests', doc: id })

  }

  const acceptRequest = (trackId, songId, requestId) => {
    console.log('before update')
    updateSong(trackId, songId);
    rejectRequest(requestId);
  }

  const updateSong = (trackId, songId) => {
    let neededId = ''
    let data = { tracks: [] };
    let alreadyContainsTrack = false;
    let songFull = true;
    let songSlot = null;
    firestore.collection("songs").where("songId", "==", songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        console.log("i'm here");
        if (data.songId !== undefined) {
          let i = 1
          while (i <= 8) {

            if (data["track" + i] === trackId) {
              alreadyContainsTrack = true;
            }
            if (data["track" + i] === "Choose a track") {
              console.log("track" + i);
              console.log(data["track" + i]);
              songFull = false;
              songSlot = i;
              i = 9;
            }
            i++;
          }
          if (alreadyContainsTrack) {
            message.warn("Already tracks this my dude!")
          } else if (songFull) {
            message.warn("this song is already full");
          }
          else {
            message.success("Post added to profile!")
            return firestore.update({ collection: 'songs', doc: neededId }, { ["track" + songSlot]: trackId })

          }
        }
      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }

  const createRequest = (trackId, songId) => {

    return firestore.collection('requests').add(
      {
        trackId: trackId,
        songId: songId,
        requester: auth.currentUser.uid,
        requestId: v4(),
        approved: null,

        timeCreated: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  let trackPlayers = {}
  const playRequestTrack = (track) => {
    if (!trackPlayers[track.trackId]) {
      var storage = firebase.storage();
      var pathReference = storage.ref('tracks/')

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
        trackPlayers[track.trackId] = new t.Player(url).toDestination();
        trackPlayers[track.trackId].autostart = true;

      }).catch(function (error) {
        console.log('error downloading');
      });
    } else {

      trackPlayers[track.trackId].start()

    }

  }

  let player2;
  let tempPlayObj = {}
  async function onPlaySongWithRequest(wholeTrack) {
    if (Object.keys(tempPlayObj).length === 0 && tempPlayObj.constructor === Object) {
      let tempTrackList = [...songTracks, wholeTrack];
      let tempUrls = [];
      var storage = firebase.storage();
      var pathReference = storage.ref('tracks/')
      let i = 0
      await tempTrackList.forEach((track) => {
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
          xhr.open('GET', "https://cors-anywhere.herokuapp.com/" + url);
          console.log("5");
          xhr.send();
          console.log("6");
          tempUrls.push(url);
          player2 = new t.Player(url).toDestination();

          tempPlayObj["player" + i] = new t.Player(url).toDestination();
          //play as soon as the buffer is loaded
          // players.add("player" + i, url)
          tempPlayObj["player" + i].autostart = true;
          i++;
          //play as soon as the buffer is loaded
        }).catch(function (error) {
          console.log('error downloading');
        });

      })
    } else {
      Object.values(tempPlayObj).forEach((ind) => {
        ind.start()
      })
    }
  }


  // const playSong = (urlListHook) => {

  //   // const theBuffer = new t.Buffer.fromUrl();

  //   let volume1;

  //   var pianoSamples = new t.Buffers(urlListHook, function () {


  //     //play one of the samples when they all load
  //     const playersFromBuffs = {};
  //     let i = 0;
  //     urlListHook.forEach((url) => {
  //       let tempBuff = pianoSamples.get(i);
  //       playersFromBuffs['buffplay' + i] = new t.Player(tempBuff).toDestination();

  //       i++
  //     });

  //     Object.keys(playersFromBuffs).map((key) => {
  //       console.log(key);
  //       // players.add(playersFromBuffs[key]);
  //       playersFromBuffs[key].start();
  //       // players.add(playersFromBuffs[key]);
  //     })

  //   });

  //   console.log("what is happening")

  // }

  const openMixer = () => {
    toggleMixer(!mixerVisible);
  }

  const deleteThisSong = (id) => {
    deleteSong();
    console.log(id);
    return firestore.delete({ collection: 'songs', doc: thisId })

  }


  const stopPlayers = () => {
    console.log(playObj)
    Object.values(playObj).forEach((ind) => {
      console.log(ind)
      ind.stop()
    })
    Object.values(tempPlayObj).forEach((ind) => {
      console.log(ind)
      ind.stop()
    })
  }

  const goBack = () => {
    stopPlayers();
    songSelect();

  }

  return (
    <>
      {
        user ?

          <div className="song-dash" style={{ border: "1px solid black" }}>

            {requestList[0] ?
              <div>
                <p>Pending Request</p>
                {ownerBool ? <div><Request request={requestList[0]} rejectRequest={rejectRequest} acceptRequest={acceptRequest} onPlaySong={onPlaySong} setRequest={setRequest} onPlaySongWithRequest={onPlaySongWithRequest} playRequestTrack={playRequestTrack} stopPlayers={stopPlayers} /> </div> : ""}
              </div>
              :
              <div>
                <p>No Requests</p>
                {(fromHome && !ownerBool) ? <Button className="control-buttons" onClick={openTrackDropDown}>Propose New Track</Button> : <Button className="control-buttons" onClick={openTrackDropDown}>Add New Track</Button>}
              </div>
            }
            {song ? <div>
              <div className="your-songs">
                <Card>
                  < CardTitle>Name : {song.name}</CardTitle>
                  <CardSubtitle>Author: {song.username}</CardSubtitle>
                  <Button className="control-buttons" onClick={goBack}>Go Back</Button>

                  <Button className="control-buttons" onClick={onPlaySong}>Play Song</Button>
                  <Button className="control-buttons" onClick={stopPlayers}>Stop Song</Button>

                </Card>
              </div>
              {/* {console.log(song)} */}
              <div>{(user.uid == song.owner) ? <div class="your-songs"><MixerEditor effects={effects} rerenderCounter={rerenderCounter} rerenderCount={rerenderCount} trackList={songTracks} song={song} /><Button className="control-buttons" onClick={() => deleteThisSong(song.id)}>Delete Song</Button></div> : <div></div>}</div>
              {/* {(fromHome && !ownerBool) ? <button onClick={openTrackDropDown}>Propose New Track</button> : <button onClick={openTrackDropDown}>Add New Track</button>} */}
              {dropdown ?
                <div>
                  <form id="trackUpdate" name="trackUpdate" onSubmit={submitRequest}>

                    <select class="choose-track" defaultValue={null} name="track1" id="track1">
                      {console.table(trackList)}
                      <option value={null}>Choose a track</option>

                      {trackList ? trackList.map((track) => { return <option class="choose-track" value={track.trackId}>{track.name}</option> }) : ""}

                    </select>
                    <button class="choose-track" >Submit Track</button>
                  </form>
                </div>
                : ''}

              <div id="song-tracks">
                <Card>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>1: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track1) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>2: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track2) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>3: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track3) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>4: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track4) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>5: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track5) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>6: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track6) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>7: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track7) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div></CardBody>
                  <CardBody>
                    <div className="song-track">
                      <CardTitle>8: </CardTitle>{songTracks.map((track, i) => {
                        if (track.trackId == song.track8) {
                          return <><CardSubtitle key={i}>Track: {track.name}</CardSubtitle><br></br><CardSubtitle>By: {track.username}</CardSubtitle></>
                        }

                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>

            </div>

              : ""}
          </div >

          : ""}

    </>
  )
}

SongDashboard.propTypes = {
  song: PropTypes.object,
  deleteSong: PropTypes.func
};

export default withFirestore(SongDashboard);
