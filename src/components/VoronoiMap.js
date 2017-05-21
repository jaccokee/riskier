import React from 'react';
import Voronoi from 'voronoi';
import Territory from './Territory';
import Namer from './Namer';

class VoronoiMap extends React.Component {
  constructor() {
    super();
    this.state = {
        selectedTerritory: null
    }
  }

  pickColors() {
    let hexColorUnselected = '';
    let hexColorSelected = ''
    let rndHex;
    for (let i=0; i<3; i++) {
      rndHex = Math.floor(Math.random()*10);
      hexColorUnselected += rndHex.toString(16);
      hexColorSelected += (rndHex+6).toString(16);
    }
    return { unselected: '#'+hexColorUnselected, selected: '#'+hexColorSelected };
  }

  render() {
    let names = Namer(12);
    console.log('names', names);
    const voronoi = new Voronoi();
    const bbox = {xl: 0, xr: this.props.width, yt: 0, yb: this.props.height}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
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
      return <Territory
               x={0}
               y={this.props.height}
               width={this.props.width}
               height={this.props.height}
               halfedges={cell.halfedges}
               colors={this.pickColors()}
               key={cntr++}
             />;
    });

    console.log(territories);
    return (
      <div style={{position: 'relative', width: this.props.width + 'px', margin: '0 auto'}}>{territories}</div>
    );
  }
}

export default VoronoiMap;