import * as t from "tone";
import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardDeck, Col, Row } from 'reactstrap';
import { Slider, Switch } from "antd";

const MixerEditor = (props) => {
  const { song } = props;



  const settings = { vol1: 1, vol2: "3", vol3: "3", vol4: "3", vol5: "3", vol6: "3", vol7: "3", vol8: "3" }
  const { vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8 } = settings;

  const [mixerOpen, openMixer] = useState(false);
  const [track1Vol, changeTrack1Vol] = useState(vol1);
  const [track2Vol, changeTrack2Vol] = useState(vol1);
  const [track3Vol, changeTrack3Vol] = useState(vol1);
  const [track4Vol, changeTrack4Vol] = useState(vol1);
  const [track5Vol, changeTrack5Vol] = useState(vol1);
  const [track6Vol, changeTrack6Vol] = useState(vol1);
  const [track7Vol, changeTrack7Vol] = useState(vol1);
  const [track8Vol, changeTrack8Vol] = useState(vol1);
  const toggleModal = () => openMixer(!mixerOpen);

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


  return (
    <React.Fragment>
      <Button onClick={toggleModal}>Open Mixer/Edit</Button>
      <Modal isOpen={mixerOpen} toggle={toggleModal} className="whole-mixer" backdrop="static">
        <ModalHeader toggle={toggleModal}>{song.name}</ModalHeader>
        <ModalBody>
          <Col>

            <Card>
              <CardBody>

                {song.track1}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track1Slide" id="track1Slide" defaultValue={vol1} onChange={update1} />

                  <p>{track1Vol}</p>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track2}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track2Slide" id="track2Slide" defaultValue={vol2} onChange={update2} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track3}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track3Slide" id="track3Slide" defaultValue={vol3} onChange={update3} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track4}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track4Slide" id="track4Slide" defaultValue={vol4} onChange={update4} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track5}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track5Slide" id="track5Slide" defaultValue={vol5} onChange={update5} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track6}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track6Slide" id="track6Slide" defaultValue={vol6} onChange={update6} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track7}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track7Slide" id="track7Slide" defaultValue={vol7} onChange={update7} />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track8}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                  <Slider name="track8Slide" id="track8Slide" defaultValue={vol8} onChange={update8} />
                </Col>
              </CardBody>
            </Card>

          </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </React.Fragment>

  )

}

export default MixerEditor;
