import * as t from "tone";
import React, { useEffect, useState, useContext } from "react";
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardDeck, Col, Row } from 'reactstrap';
import { message, Slider, Switch } from "antd";
import { useFirestore } from "react-redux-firebase";

const MixerEditor = (props) => {
  const { song, effects, rerenderCount, rerenderCounter } = props;
  const firestore = useFirestore();

  const settings = { vol1: 1, vol2: 2, vol3: 3, vol4: 4, vol5: 5, vol6: 6, vol7: 7, vol8: 8 }
  console.log(effects);
  const { vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8 } = effects;
  console.log(vol1);

  const [mixerOpen, openMixer] = useState(false);

  const [track1Vol, changeTrack1Vol] = useState(null);
  const [track2Vol, changeTrack2Vol] = useState(null);
  const [track3Vol, changeTrack3Vol] = useState(null);
  const [track4Vol, changeTrack4Vol] = useState(null);
  const [track5Vol, changeTrack5Vol] = useState(null);
  const [track6Vol, changeTrack6Vol] = useState(null);
  const [track7Vol, changeTrack7Vol] = useState(null);
  const [track8Vol, changeTrack8Vol] = useState(null);
  const toggleModal = () => { openMixer(!mixerOpen); }

  function update1(e) {
    console.log(e);
    changeTrack1Vol(e);
  }
  function update2(e) {
    console.log(e);
    changeTrack2Vol(e);
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
    initializeVals();
  }, [])

  const updateSong = (songId, vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8) => {

    let neededId = ''
    let data = { tracks: [] };

    console.log(document.getElementById("track1Slide").value);

    firestore.collection("songSettings").where("songId", "==", songId).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data();
        });

        message.success("Post added to profile!")
        return firestore.update({ collection: 'songs', doc: neededId }, {
          songId: songId, vol1: vol1, vol2: vol2, vol3: vol3, vol4: vol4, vol5: vol5, vol6: vol6, vol7: vol7, vol8: vol8
        })

      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }




  const saveChanges = (event) => {
    event.preventDefault();
    rerenderCounter(0);
    updateSong(song.songId, track1Vol, track2Vol, track3Vol, track4Vol, track5Vol, track6Vol, track7Vol, track8Vol);
    toggleModal();
  }


  const playTrack = (trackNumber) => {
    console.log(trackNumber);
  }

  const stopTrack = (trackNumber) => {
    console.log(trackNumber);
  }

  const playSong = () => {

  }

  const stopSong = () => {

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

                  {song.track1}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(1)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(1)}>Stop</Button>
                    <Label>
                      Volume
                    <Slider className="mix-slider" name="track1Slide" id="track1Slide" defaultValue={vol1} onChange={update1} />
                    </Label>
                    <p>{track1Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track2}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(2)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(2)}>Stop</Button>
                    <Slider className="mix-slider" name="track2Slide" id="track2Slide" defaultValue={vol2} onChange={update2} />
                    <p>{track2Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track3}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(3)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(3)}>Stop</Button>
                    <Slider className="mix-slider" name="track3Slide" id="track3Slide" defaultValue={vol3} onChange={update3} />
                    <p>{track3Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track4}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(4)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(4)}>Stop</Button>
                    <Slider className="mix-slider" name="track4Slide" id="track4Slide" defaultValue={vol4} onChange={update4} />
                    <p>{track4Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track5}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(5)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(5)}>Stop</Button>
                    <Slider className="mix-slider" name="track5Slide" id="track5Slide" defaultValue={vol5} onChange={update5} />
                    <p>{track5Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track6}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(6)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(6)}>Stop</Button>
                    <Slider className="mix-slider" name="track6Slide" id="track6Slide" defaultValue={vol6} onChange={update6} />
                    <p>{track6Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track7}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(7)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(7)}>Stop</Button>
                    <Slider className="mix-slider" name="track7Slide" id="track7Slide" defaultValue={vol7} onChange={update7} />
                    <p>{track7Vol}</p>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  {song.track8}
                  <Col>
                    <Button className="mixer-play-button" onClick={() => playTrack(8)}>Play</Button>
                    <Button className="mixer-play-button" onClick={() => stopTrack(8)}>Stop</Button>
                    <Slider className="mix-slider" name="track8Slide" id="track8Slide" defaultValue={vol8} onChange={update8} />
                    <p>{track8Vol}</p>
                  </Col>
                </CardBody>
              </Card>

            </Col>
            <button type="submit">Save Changes?</button>
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
