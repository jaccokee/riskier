import React, { Component } from 'react';
import smileface from './smileface.svg';
import './App.css';
import Voronoi from 'voronoi';

// 1. new component to draw n lines
// 2. try to run voronoi compute
// 3. try to draw some edges from the computed voronoi result

class App extends Component {
  generateRandomData() {
    const d = [];
    const xCenter = 100;
    const yCenter = 100;
    const deltaAngle = Math.PI/20.0;
    const noiseLevel = 15;
    const radius = 80;
    let x, y;
    for (let i=0.0; i<2*Math.PI; i+=deltaAngle) {
      x = xCenter + Math.floor(Math.cos(i)*radius + Math.random()*noiseLevel);
      y = yCenter + Math.floor(Math.sin(i)*radius + Math.random()*noiseLevel);
      d.push([x, y]);
    }
    return d;
  }
  render() {
    const data = this.generateRandomData();
    return (
      <div className="App">
        <div className="App-header">
          <Star className="App-logo" alt="logo" />
          <h2>Welcome to "Riskier"</h2>
        </div>
        <p className="App-intro">
          Researching using svg in react to draw random shapes.
        </p>
        <Box x1="10" x2="40" y1="20" y2="80" color="#629"/>
        <Box x1="0" x2="80" y1="0" y2="24" color="#992"/>
        <Box x1="0" x2="45" y1="0" y2="45" color="#C22"/>
        <Star />
        <SmileFace />
        <Polygon width="200" height="200" data={data} color="#C33"/>
        <Map width="200" height="200" color="#C33" className="App-logo" />

      </div>
    );
  }
}

class Box extends React.Component {
  constructor() {
    super();
    this.state = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      color: '#000',
    }
  }
  render() {
    var width = this.props.x2 - this.props.x1;
    var height = this.props.y2 - this.props.y1;
    return (
      <span>
        <span className="boxed" style={{width: width + 'px', height: height + 'px', color: this.props.color, display: 'inline-block'}}></span>
      </span>
    );
  }
}

class Star extends React.Component {
  constructor() {
    super();
    this.state = {
      teeth: 6,
      diameter2: 0.34,
      diameter3: 0.06,
      splay: 1
    }
  }
  render() {
    return (
      <svg viewBox="0 0 64 64" width="64" height="64" fill="#A33">
        <path d="M 32 0 L 32 0 L 37.5 22.473720558371177 A 11 11 0 0 1 37.5 22.473720558371177 L 59.71281292110204 16 L 59.71281292110204 16 L 43 32 A 11 11 0 0 1 43 32 L 59.71281292110204 48 L 59.71281292110204 48 L 37.5 41.52627944162882 A 11 11 0 0 1 37.5 41.52627944162882 L 32 64 L 32 64 L 26.500000000000004 41.52627944162883 A 11 11 0 0 1 26.500000000000004 41.52627944162883 L 4.287187078897961 48 L 4.287187078897961 48 L 21 32 A 11 11 0 0 1 21 32 L 4.287187078897965 15.999999999999996 L 4.287187078897965 15.999999999999996 L 26.499999999999993 22.473720558371177 A 11 11 0 0 1 26.499999999999993 22.473720558371177 M 32 30 A 2 2 0 0 0 32 34 A 2 2 0 0 0 32 30"></path>
      </svg>
    );
  }
}

class SmileFace extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
    }
  }
  render() {
    console.log('smileface is: ', smileface);
    return (
      <img src={smileface} className="smileface" alt="smile!" />
    );
  }
}

class LineSegment extends React.Component {
  static defaultProps = { multiplier: 1 };

  generatePathData() {
    let d = [`M ${this.props.x + this.props.data[0][0]} ${this.props.y - this.props.data[0][1]}`];

    let collector = this.props.data.map(chunk => {
      let xNext = this.props.x + chunk[0] * this.props.multiplier;
      let yNext = this.props.y - chunk[1] * this.props.multiplier;
      return `L ${xNext} ${yNext}`;
    });
    collector.push(`L ${this.props.x + this.props.data[0][0]} ${this.props.y - this.props.data[0][1]}`);

    return d.concat(collector).join(' ');
  }

  render() {
    let d = this.generatePathData();
    console.log('in LineSegment#render', d);
    return (
      <path d={d}
        stroke={this.props.color}
        strokeWidth={1}
        fill="none"
      />
    );
  }
}

class Polygon extends React.Component {
  constructor() {
    super();
    this.state = {
      points: [],
    }
  }
  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <LineSegment
          x={0}
          y={this.props.height}
          color={this.props.color}
          data={this.props.data}
        />
      </svg>
    )
  }
}

class Map extends React.Component {
  constructor() {
    super();
  }

  generatePathData(edges) {
    let d = [`M 0 0 L ${this.props.width} 0 L ${this.props.width} ${this.props.height} L 0 ${this.props.height} L 0 0`];

    let collector = edges.map(edge => {
      return `M ${edge.va.x} ${edge.va.y} L ${edge.vb.x} ${edge.vb.y}`;
    });

    return d.concat(collector).join(' ');
  }

  render() {
    var voronoi = new Voronoi();
    var bbox = {xl: 0, xr: this.props.width, yt: 0, yb: this.props.height}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    //var sites = [ {x: 25, y: 12}, {x: 40, y: 60}, {x: 60, y: 130}, {x: 170, y: 60}, {x: 155, y: 125}, {x: 90, y: 105} /* , ... */ ];
    let sites = [];
    let pt;
    for (let i=0; i<20; i++) {
      pt = {};
      pt.x = Math.floor(Math.random() * this.props.width);
      pt.y = Math.floor(Math.random() * this.props.height);
      sites.push(pt);
    }
    console.log('sites', sites);
    // a 'vertex' is an object exhibiting 'x' and 'y' properties.
    // The Voronoi object will add a unique 'voronoiId' property to all sites.
    // The 'voronoiId' can be used as a key to lookup the associated cell in diagram.cells. 
    var diagram = voronoi.compute(sites, bbox);
    console.log('voronoi diagram: ', diagram);

    let d = this.generatePathData(diagram.edges);
    console.log('voronoi path data: ', d);
    return (
      <svg width={this.props.width} height={this.props.height}>
        <path d={d}
          stroke={this.props.color}
          strokeWidth={1}
          fill="none"
        />
      </svg>
    );
  }
}

export default App;
