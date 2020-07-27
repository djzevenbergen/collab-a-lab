

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

export default function SongList(props) {
  const { songs, fromHome } = props;
  const [songList, setList] = useState(null);

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
  }, [auth])

  const onClickSong = (post) => {
    const synth = new t.MembraneSynth().toMaster();
    // play a note with the synth we setup
    synth.triggerAttackRelease("C2", "8n");
  }

  return (
    <React.Fragment>

      {songDetail ? <SongDashboard song={tempSong} songSelect={songSelect} fromHome={fromHome} /> :

        <div className="main-container">
          <div className="song-container">
            <div className="song-box">
            </div>
            {songs ? songs.map((song, i) => <Song key={i} song={song} dragProp="list" canDelete={false} event={onClickSong} selectSong={songSelect} fromHome={fromHome} />) : ''}
          </div>
        </div >}
    </React.Fragment>

  );
}

SongList.propTypes = {
  songs: PropTypes.object,
  fromHome: PropTypes.bool
};