import Profile from './Profile';
import React, { useState } from 'react';
import Header from './Header';
import SongList from './SongList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from './userContext';
import SongDashboard from "./SongDashboard";
import Home from "./Home";


import 'antd/dist/antd.css';
import ReusableTrackForm from './ReusableTrackForm';
import ReusableSongForm from './ReusableSongForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

function App() {
  const [value, setValue] = useState(null)

  return (

    <Router>
      <UserContext.Provider value={{ value, setValue }} theme={theme}>

        <Header />
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/addtrack'>
            <ReusableTrackForm />
          </Route>
          <Route path="/addsong">
            <ReusableSongForm />
          </Route>
          <Route path="/songdashboard">
            <SongDashboard />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router >
  );
}

export default App;