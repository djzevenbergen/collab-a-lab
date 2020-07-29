import * as t from "tone";
import React, { useEffect, useState, useContext } from "react";
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardDeck, Col, Row } from 'reactstrap';
import { message, Slider, Switch } from "antd";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

const MixerEditor = (props) => {
  const { song, effects, rerenderCount, rerenderCounter, trackList } = props;
  const firestore = useFirestore();

  const settings = { vol1: 1, vol2: 2, vol3: 3, vol4: 4, vol5: 5, vol6: 6, vol7: 7, vol8: 8 }
  console.log(effects);

  const { vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8 } = effects;


  const orderedTrackList = [];


  trackList.forEach((track) => {
    for (let i = 1; i <= 8; i++) {
      if (track.trackId == song["track" + i]) {
        orderedTrackList.push(track);
      }
    }
  })



  console.log(orderedTrackList);

  console.log(vol1);

  const [mixerOpen, openMixer] = useState(false);

  const [track1Vol, changeTrack1Vol] = useState(vol1);
  const [track2Vol, changeTrack2Vol] = useState(vol2);
  const [track3Vol, changeTrack3Vol] = useState(vol3);
  const [track4Vol, changeTrack4Vol] = useState(vol4);
  const [track5Vol, changeTrack5Vol] = useState(vol5);
  const [track6Vol, changeTrack6Vol] = useState(vol6);
  const [track7Vol, changeTrack7Vol] = useState(vol7);
  const [track8Vol, changeTrack8Vol] = useState(vol8);
  const [playerListHook, setPlayerList] = useState(null);
  const [urlListHook, setUrlList] = useState(null);
  const toggleModal = () => { openMixer(!mixerOpen); }

  function update1(e) {
    console.log(e);
    changeTrack1Vol(e);
    // console.table(playerListHook);
    // console.log(playerList.player1.volume);
    // playerListHook.player1.volume.value = track1Vol;
    console.log(track1Vol);
  }
  function update2(e) {
    console.log(e);

    changeTrack2Vol(e);

    // playerListHook.player2.volume.value = track2Vol;
  }
  function update3(e) {
    console.log(e);
    changeTrack3Vol(e);

  }
  function update4(e) {
    console.log(e);
    changeTrack4Vol(e);
  }
  function update5(e) {
    console.log(e);
    changeTrack5Vol(e);
  }
  function update6(e) {
    console.log(e);
    changeTrack6Vol(e);
  }
  function update7(e) {
    console.log(e);
    changeTrack7Vol(e);
  }
  function update8(e) {
    console.log(e);
    changeTrack8Vol(e);
  }

  console.log(track1Vol, track2Vol, track3Vol, track4Vol, track5Vol, track6Vol, track7Vol, track8Vol);

  const initializeVals = () => {

    changeTrack1Vol(vol1);
    changeTrack2Vol(vol2);
    changeTrack3Vol(vol3);
    changeTrack4Vol(vol4);
    changeTrack5Vol(vol5);
    changeTrack6Vol(vol6);
    changeTrack7Vol(vol7);
    changeTrack8Vol(vol8);

    rerenderCounter(1);

  }
  console.log(rerenderCount);
  useEffect(() => {
    // initializeVals();
    // console.log("setting up players");
    setUpPlayers();
  }, [mixerOpen])

  const updateSong = (songId, v1, v2, v3, v4, v5, v6, v7, v8) => {

    if (!v1) {
      v1 = vol1;
    }
    if (!v2) {
      v2 = vol2;
    }
    if (!v3) {
      v3 = vol3;
    }
    if (!v4) {
      v4 = vol4;
    }
    if (!v5) {
      v5 = vol5;
    }
    if (!v6) {
      v6 = vol6;
    }
    if (!v7) {
      v7 = vol7;
    }
    if (!v8) {
      v8 = vol8;
    }

    let neededId = ''
    let data = { tracks: [] };


    firestore.collection("songSettings").where("songId", "==", songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data();
        });

        message.success("Post added to profile!")
        return firestore.update({ collection: 'songSettings', doc: neededId }, {
          songId: songId, vol1: v1, vol2: v2, vol3: v3, vol4: v4, vol5: v5, vol6: v6, vol7: v7, vol8: v8
        })

      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }


  const saveChanges = (event) => {
    event.preventDefault();
    rerenderCounter(0);
    console.log(track1Vol, track2Vol)
    updateSong(song.songId, track1Vol, track2Vol, track3Vol, track4Vol, track5Vol, track6Vol, track7Vol, track8Vol);
    toggleModal();
  }




  // //tone js stuff
  let player1 = null;
  let player2 = null;
  let player3 = null;
  let player4 = null;
  let player5 = null;
  let player6 = null;
  let player7 = null;
  let player8 = null;

  let playerList = {};

  // function firstFunction(_callback) {
  //   // do some asynchronous work
  //   // and when the asynchronous stuff is complete
  //   _callback();
  // }

  // function secondFunction() {
  //   // call first function and pass in a callback function which
  //   // first function runs when it has completed
  //   firstFunction(function () {
  //     console.log('huzzah, I\'m done!');
  //   }
  // }
  let urlList;

  async function setUpPlayers(setPlayers) {
    let thisUrlList = [];
    var storage = firebase.storage();
    var pathReference = storage.ref('tracks/')
    let count = 1;
    await orderedTrackList.forEach((track) => {
      pathReference.child(`${track.url}`).getDownloadURL().then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        console.log("1");
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        console.log(track.name);
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
        thisUrlList.push(url);
        playerList["player" + count] = new t.Player(url).toDestination();
        // thisUrlList.push(url);
        count++;


      }).catch(function (error) {
        console.log('error downloading');
      });

    })
    // console.log("setPlayers", thisUrlList);
    // urlList = thisUrlList;
    // console.log(thisUrlList.length);
    // thisUrlList.forEach((url) => {
    //   console.log("hi")
    // })
    // setPlayers();

    makePlayerList(playerList);
    setUrlList(thisUrlList);

  }

  const makePlayerList = (playerL) => {
    setPlayerList(playerL);
  }

  // function setUp() {


  //   setUpPlayers(function () {


  //     if (urlList[1]) {
  //       console.log('made player 1')
  //       player1 = new t.Player(urlList[0]).toDestination();
  //       playerList["player1"] = player1;

  //     }
  //     if (urlList[1]) {
  //       player2 = new t.Player(urlList[1]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[2]) {
  //       player3 = new t.Player(urlList[2]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[3]) {
  //       player4 = new t.Player(urlList[3]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[4]) {
  //       player5 = new t.Player(urlList[4]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[5]) {
  //       player6 = new t.Player(urlList[5]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[6]) {
  //       player7 = new t.Player(urlList[6]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //     if (urlList[7]) {
  //       player8 = new t.Player(urlList[7]).toDestination();
  //       playerList["player1"] = player1;
  //     }
  //   }
  //   )
  // }



  // player2 = new t.Player(url).toDestination();
  // //play as soon as the buffer is loaded
  // player2.autostart = true;




  async function playTrack(trackNumber) {
    console.log(playerListHook["player" + trackNumber]);

    await playerListHook["player" + trackNumber].start();
    let vol;
    // { track3Vol ? vol = track3Vol : vol = vol3 }

    switch (trackNumber) {
      case 1:
        { track1Vol ? vol = track1Vol : vol = vol1 }

        break;
      case 2:
        { track2Vol ? vol = track2Vol : vol = vol2 }
        break;
      case 3:
        { track3Vol ? vol = track3Vol : vol = vol3 }
        break;
      case 4:
        { track4Vol ? vol = track4Vol : vol = vol4 }
        break;
      case 5:
        { track5Vol ? vol = track5Vol : vol = vol5 }
        break;
      case 6:
        { track6Vol ? vol = track6Vol : vol = vol6 }
        break;
      case 7:
        { track7Vol ? vol = track7Vol : vol = vol7 }
        break;
      case 8:
        { track8Vol ? vol = track8Vol : vol = vol8 }
        break;
      default:
        break;
    }
    playerListHook["player" + trackNumber].volume.value = vol;

    console.log(trackNumber);
  }

  const stopTrack = (trackNumber) => {
    console.log(playerListHook["player" + trackNumber]);
    playerListHook["player" + trackNumber].stop();
    console.log(trackNumber);
  }
  let players = new t.Players();
  const playSong = () => {
    console.log(trackList);
    console.log(playerListHook)
    console.log(playerListHook["player1"])
    console.log(playerListHook.player1)
    // const theBuffer = new t.Buffer.fromUrl();

    let volume1;

    const playThem = () => {
      console.log('i happen')
      { track1Vol ? volume1 = track1Vol : volume1 = vol1 }
      let player11 = new t.Player(urlListHook[0]).toDestination();
      player11.start();
      // const channel1 = new t.Channel(0, volume1);
      // player11.connect(channel1);


      let volume2;
      { track2Vol ? volume2 = track2Vol : volume2 = vol2 }
      let player22 = new t.Player(urlListHook[1]).toDestination(); player22.start();

      // const channel2 = new t.Channel(0, volume2);
      // player22.connect(channel2);


      let volume3;
      { track3Vol ? volume3 = track3Vol : volume3 = vol3 }
      let player33 = new t.Player(urlListHook[2]).toDestination();
      player33.start();

      // const channel3 = new t.Channel(0, volume3);
      // player33.connect(channel3);

      // let volume4;
      // { track4Vol ? volume4 = track4Vol : volume4 = vol4 }
      // playerList[player3].connect(channel3);
      // const channel4 = new t.Channel(0, volume4);

      // const channel5 = new t.Channel().toDestination();

      // channel4.connect(channel5);
      // channel3.connect(channel5);
      // channel2.connect(channel5);
      // channel1.connect(channel5);


      // theBuffer.on('load', () => {


      // })

    }
    // const buffer = new t.Buffer(urlListHook[0], function () {
    //   let buff = buffer.get();
    //   let player222 = new t.Player(buff).toDestination();
    //   player222.start();
    // });

    let player = new t.Player();

    var pianoSamples = new t.Buffers(urlListHook, function () {
      let volumesForThis = {};

      { track1Vol ? volumesForThis.volumpt1 = track1Vol : volumesForThis.volumpt1 = vol1 }

      { track2Vol ? volumesForThis.volumpt2 = track2Vol : volumesForThis.volumpt2 = vol2 }

      { track3Vol ? volumesForThis.volumpt3 = track3Vol : volumesForThis.volumpt3 = vol3 }

      { track4Vol ? volumesForThis.volumpt3 = track4Vol : volumesForThis.volumpt3 = vol4 }

      { track5Vol ? volumesForThis.volumpt3 = track5Vol : volumesForThis.volumpt3 = vol5 }

      { track6Vol ? volumesForThis.volumpt3 = track6Vol : volumesForThis.volumpt3 = vol6 }

      { track7Vol ? volumesForThis.volumpt3 = track7Vol : volumesForThis.volumpt3 = vol7 }

      { track8Vol ? volumesForThis.volumpt3 = track8Vol : volumesForThis.volumpt3 = vol8 }

      //play one of the samples when they all load
      const playersFromBuffs = {};
      let i = 0;
      urlListHook.forEach((url) => {
        let tempBuff = pianoSamples.get(i);
        playersFromBuffs['buffplay' + i] = new t.Player(tempBuff).toDestination();

        playersFromBuffs['buffplay' + i].volume.value = volumesForThis["volumpt" + (i + 1)];
        i++
      });

      Object.keys(playersFromBuffs).map((key) => {
        console.log(key);
        playersFromBuffs[key].start();
      })

      // let buff = pianoSamples.get(0);
      // let buff2 = pianoSamples.get(1);
      // let buff3 = pianoSamples.get(2);
      // let player111 = new t.Player(buff).toDestination();
      // let player333 = new t.Player(buff2).toDestination();
      // let player444 = new t.Player(buff3).toDestination();

      // player111.start();
      // player333.start();
      // player444.start();
      // players.add(player111);
      // players.add(player333);
      // players.add(player444);



    });

    console.log("what is happening")

  }

  const stopSong = () => {

    players.stopAll();
  }


  return (
    <React.Fragment>
      <Button onClick={toggleModal}>Open Mixer/Edit</Button>
      <Modal isOpen={mixerOpen} toggle={toggleModal} className="whole-mixer" backdrop="static">
        <ModalHeader toggle={toggleModal}>{song.name}</ModalHeader>
        <ModalBody>
          <form id="mixer-form" onSubmit={() => saveChanges}>
            <Col>

              <Card>
                <CardBody>
                  <Col>
                    <Button className="mixer-play-button" onClick={playSong}>Play Song</Button>
                    <Button className="mixer-play-button" onClick={stopSong}>Stop Song</Button>
                  </Col>
                </CardBody>
              </Card>

              <Card>
                <CardBody>

                  {/* <p>{trackList[0] ? trackList[0] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(1)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(1)}>Stop</Button>
                    <Label>
                      Volume
                    <Slider className="mix-slider" name="track1Slide" id="track1Slide" min={-50} max={50} defaultValue={vol1} onChange={update1} />
                    </Label>
                    <p>{track1Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[1] ? trackList[1] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(2)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(2)}>Stop</Button>
                    <Slider className="mix-slider" name="track2Slide" id="track2Slide" min={-50} max={50} defaultValue={vol2} onChange={update2} />
                    <p>{track2Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[2] ? trackList[2] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(3)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(3)}>Stop</Button>
                    <Slider className="mix-slider" name="track3Slide" id="track3Slide" min={-50} max={50} defaultValue={vol3} onChange={update3} />
                    <p>{track3Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[3] ? trackList[3] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(4)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(4)}>Stop</Button>
                    <Slider className="mix-slider" name="track4Slide" id="track4Slide" min={-50} max={50} defaultValue={vol4} onChange={update4} />
                    <p>{track4Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[4] ? trackList[4] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(5)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(5)}>Stop</Button>
                    <Slider className="mix-slider" name="track5Slide" id="track5Slide" min={-50} max={50} defaultValue={vol5} onChange={update5} />
                    <p>{track5Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[5] ? trackList[5] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(6)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(6)}>Stop</Button>
                    <Slider className="mix-slider" name="track6Slide" id="track6Slide" min={-50} max={50} defaultValue={vol6} onChange={update6} />
                    <p>{track6Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[6] ? trackList[6] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(7)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(7)}>Stop</Button>
                    <Slider className="mix-slider" name="track7Slide" id="track7Slide" min={-50} max={50} defaultValue={vol7} onChange={update7} />
                    <p>{track7Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {/* <p>{trackList[7] ? trackList[7] : "empty"}</p> */}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(8)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(8)}>Stop</Button>
                    <Slider className="mix-slider" name="track8Slide" id="track8Slide" min={-50} max={50} defaultValue={vol8} onChange={update8} />
                    <p>{track8Vol}</p>
                  </Col>
                </CardBody>
              </Card>

            </Col>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>Save Changes</Button>{' '}

          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </React.Fragment>
  )
}

export default MixerEditor;
