import * as t from "tone";
import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MixerEditor = (props) => {
  const { song } = props;
  const [mixerOpen, openMixer] = useState(false);
  const toggleModal = () => openMixer(!mixerOpen);

  return (
    <React.Fragment>


      <Button onClick={toggleModal}>Open Mixer/Edit</Button>
      <Modal isOpen={mixerOpen} toggle={toggleModal} className="whole-mixer" backdrop="static">
        <ModalHeader toggle={toggleModal}>{song.name}</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
