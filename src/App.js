import React, { Component } from 'react';
import './App.css';
//import { ART } from 'react';
import Voronoi from 'voronoi';
import Star from './components/Star';
import HexTile from './components/HexTile';
import Territory from './components/Territory';

/*
TODO:
* Make a Territory component
* Have Map component voronoi object generate Territories from cells
* Have Territories fill with different colors
* ---
* Make game states - e.g., Splash screen, game setup mode, game in progress, game over
*/

class App extends Component {
  render() {
    const hexKey = 1;
    const hexData = { size: 50, pixelCoordinates: { x: 25, y: 25 } };
    return (
      <div className="App">
        <div className="App-header">
          <Star className="App-logo" alt="logo" />
          <h2>Welcome to "Riskier"</h2>
        </div>
        <Map2 width="800" height="500" territories="140" color="#A33" />
        <HexTile key={ hexKey } size={hexData.size} centre={hexData.pixelCoordinates}></HexTile>

      </div>
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
    let sites = [];
    let pt;
    for (let i=0; i<this.props.territories; i++) {
      pt = {};
      pt.x = Math.floor(Math.random() * this.props.width);
      pt.y = Math.floor(Math.random() * this.props.height);
      sites.push(pt);
    }
    // a 'vertex' is an object exhibiting 'x' and 'y' properties.
    // The Voronoi object will add a unique 'voronoiId' property to all sites.
    // The 'voronoiId' can be used as a key to lookup the associated cell in diagram.cells. 
    var diagram = voronoi.compute(sites, bbox);
    console.log('voronoi diagram: ', diagram);

    let d = this.generatePathData(diagram.edges);
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

class Map2 extends Component {
  constructor() {
    super();
  }

  render() {
    var voronoi = new Voronoi();
    var bbox = {xl: 0, xr: this.props.width, yt: 0, yb: this.props.height}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    let sites = [];
    let pt;
    for (let i=0; i<this.props.territories; i++) {
      pt = {};
      pt.x = Math.floor(Math.random() * this.props.width);
      pt.y = Math.floor(Math.random() * this.props.height);
      sites.push(pt);
    }
    // a 'vertex' is an object exhibiting 'x' and 'y' properties.
    // The Voronoi object will add a unique 'voronoiId' property to all sites.
    // The 'voronoiId' can be used as a key to lookup the associated cell in diagram.cells. 
    var diagram = voronoi.compute(sites, bbox);

    let cntr = 0;
    const territories = diagram.cells.map((cell) => {
      return <Territory x={0} y={this.props.height} width={this.props.width} height={this.props.height} halfedges={cell.halfedges} color={this.props.color} key={cntr++} />;
    });

    //console.log(territories);
    return (
      <div style={{position: 'relative', width: this.props.width + 'px', margin: '0 auto'}}>{territories}</div>
    );
  }
}

export default App;
