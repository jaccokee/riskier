import React from 'react';

class RoughPolygon extends React.Component {
  constructor() {
    super();
    this.state = {
      points: [],
    }
  }
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
      <svg width={this.props.width} height={this.props.height}>
        <LineSegment
          x={0}
          y={this.props.height}
          color={this.props.color}
          data={data}
        />
      </svg>
    )
  }
}

module.exports = RoughPolygon;