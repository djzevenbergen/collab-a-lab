import React, { useState, useEffect } from 'react';
import axios from "axios";
import Track from "./Track";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Song from "./Song";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";
import * as t from "tone";


export default function TrackList(props) {
  const [songList, setList] = useState(null);
  const [favePage, goToFaves] = useState(false);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const firestore = useFirestore();

  const likesPage = () => {
    goToFaves(!favePage);
  }

  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  const onLike = (post) => {
    let neededId = ''
    let data = { liked: [] };
    let haslikedPost = false;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        if (data.liked !== undefined) {
          data.liked.forEach(likedPost => {
            if (likedPost.songId === post.songId) {
              haslikedPost = true;
            }
          })
          if (haslikedPost) {
            message.warn("Already liked this my dude!")
          } else {
            message.success("Post added to profile!")
            return firestore.update({ collection: 'users', doc: neededId }, { liked: [...data.liked, post] })

          }
        } else {
          return firestore.update({ collection: 'users', doc: neededId }, { liked: [post] })
        }
      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }


  const onClickTrack = (post) => {
    const synth = new t.MembraneSynth().toMaster();
    // play a note with the synth we setup
    synth.triggerAttackRelease("C2", "8n");
  }

  return (

    <div className="main-container">
      <div className="track-container">
        <div className="track-box">
          <p>This should be a list of tracks</p>

        </div>
        {props.tracks ? props.tracks.map((track, i) => <Track key={i} track={track} dragProp="list" canDelete={false} event={onClickTrack} setTrackList={setList} />) : ''}
      </div>
      <button onClick={likesPage} > Likes </button>

    </div >

  );


}
TrackList.propTypes = {
  tracks: PropTypes.object
};

