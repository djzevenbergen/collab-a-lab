import * as t from "tone";
import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardDeck, Col, Row } from 'reactstrap';
import { Slider, Switch } from "antd";

const MixerEditor = (props) => {
  const { song } = props;
  const [mixerOpen, openMixer] = useState(false);
  const [track1Vol, changeTrack1Vol] = useState(50);
  const toggleModal = () => openMixer(!mixerOpen);





  function update(e) {
    console.log(e);
    changeTrack1Vol(e);
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
                  <Slider name="track1Slide" id="track1Slide" defaultValue={30} onChange={update} />

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
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track3}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track4}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track5}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track6}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track7}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {song.track8}
                <Col>
                  <Button className="mixer-play-button">Play</Button>
                  <Button className="mixer-play-button">Stop</Button>
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
