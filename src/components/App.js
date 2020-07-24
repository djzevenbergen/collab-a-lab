import Profile from './Profile';
import React, { useState } from 'react';
import Header from './Header';
import RemedyList from './RemedyList';
import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from './userContext';

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
      <UserContext.Provider value={{ value, setValue }}>

        <Header theme={theme} />
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/'>
            <RemedyList />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router >
  );
}

export default App;