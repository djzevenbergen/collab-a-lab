

import React, { useState, useEffect } from 'react';
import axios from "axios";
import propTypes from 'prop-types';
import Song from "./Song";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";
import * as t from "tone";
import SongDashboard from "./SongDashboard";
import { Redirect } from 'react-router-dom';

export default function SongList(props) {
  const { songs } = props;
  const [songList, setList] = useState(null);
  const [favePage, goToFaves] = useState(false);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const [songDetail, selectSong] = useState(false);
  const [tempSong, changeTempSong] = useState({});
  const firestore = useFirestore();

  const likesPage = () => {
    goToFaves(!favePage);
  }

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

      {songDetail ? <SongDashboard song={tempSong} /> :

        <div className="main-container">
          <div className="song-container">
            <div className="song-box">
            </div>
            {songs ? songs.map((song, i) => <Song key={i} song={song} dragProp="list" canDelete={false} event={onClickSong} selectSong={songSelect} />) : ''}
          </div>

        </div >}
    </React.Fragment>


  );
}