/* eslint-disable react/jsx-filename-extension */
import React, { Component} from "react";
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Zodiac from './components/Zodiac';
import Nav from './components/Nav'
import Heart from './components/Heart'
import Love from './components/Love'


export default class Routes extends Component {


  render() {

    return (
        <Router>
      <div id='column-maker'>
        <Route component={Nav}/>
        <Route component={Heart}/>
        <Switch>
        <Route exact path='/' component={Love}/>
        <Route path="/zodiac" component={Zodiac}/>

        </Switch>
      </div>
      </Router>
    );
  }
}


