import Profile from './TrackList';
import React, { useState } from 'react';
import Header from './Header';
import SongList from './SongList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';


import 'antd/dist/antd.css';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

function App() {
  const [value, setValue] = useState("not logged in")


  return (


    <Router>


      <Header theme={theme} />
      <Switch>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route exact path='/'>
          <SongList />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;