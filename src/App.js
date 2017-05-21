import React, { Component } from 'react';
import './App.css';
//import { ART } from 'react';
import Star from './components/Star';
import VoronoiMap from './components/VoronoiMap';

/*
TODO:
* Make game states - e.g., Splash screen, game setup mode, game in progress, game over
* Make territories clickable to change color
* Draw names on territories
* Allow drawing thicker border for owned territories
* Draw boarders in black (or constant color), still fill with random colors
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Star />
          <span style={{fontSize:'32px', fontWeight:'bold'}}>Riskier</span>
        </div>
        <VoronoiMap  width="800" height="500" territories="32" />

      </div>
    );
  }
}

export default App;
