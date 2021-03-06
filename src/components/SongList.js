

import React, { useState, useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Song from "./Song";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";
import * as t from "tone";
import SongDashboard from "./SongDashboard";
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';
import { Card } from "reactstrap";

export default function SongList(props) {
  const { songs, fromHome, changeList, setDelete } = props;
  const [songList, setList] = useState(null);
  const [value, setValue] = useState(UserContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const [songDetail, selectSong] = useState(false);
  const [tempSong, changeTempSong] = useState({});
  const firestore = useFirestore();


  const songSelect = (song) => {
    console.log(song);
    selectSong(!songDetail);

    changeTempSong(song);


    console.log(tempSong);
  }

  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
    setValue(auth.currentUser)
  }, [auth])

  const onClickSong = (post) => {
    const synth = new t.MembraneSynth().toDestination();
    // play a note with the synth we setup
    synth.triggerAttackRelease("C2", "8n");
  }

  const deleteSong = () => {
    songSelect({});
    changeList();
    setDelete();
    console.log("delete");

  }


  return (
    <React.Fragment>

      {songDetail ?
        <SongDashboard changeTempSong={changeTempSong} deleteSong={() => deleteSong()} selectSong={() => songSelect} song={tempSong} songSelect={songSelect} fromHome={fromHome} />
        :

        <div className="main-container">
          <div className="song-container">
            <div className="song-box">
            </div>
            <Card>
              {songs ? songs.map((song, i) => <Song key={i} song={song} dragProp="list" canDelete={false} event={onClickSong} selectSong={songSelect} fromHome={fromHome} />) : ''}
            </Card>
          </div>
        </div >}
    </React.Fragment>

  );
}

SongList.propTypes = {
  songs: PropTypes.object,
  fromHome: PropTypes.bool,
  changeList: PropTypes.func
};