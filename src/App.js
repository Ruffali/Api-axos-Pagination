import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import Main from './components/main/Main';
import OnePost from './components/onePost/OnePost';

const App = () => {

  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/:id" exact component={OnePost} />
    </Switch>
  )

}

export default App;
