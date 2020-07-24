

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Song from "./Song";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";

export default function SongList() {
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

  return (

    <div className="main-container">
      <div className="song-container">
        <div className="song-box">
          <p>Drag and drop remedies to add to your list</p>
        </div>
        {songList ? songList.map((song, i) => <Song key={i} song={song} dragProp="list" canDelete={false} event={onLike} setsongList={setList} />) : ''}
      </div>
      <button onClick={likesPage} > Likes </button>
    </div >

  );
}