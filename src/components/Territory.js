import React, { Component } from 'react';

class Territory extends Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    }
  };
  generatePathData() {
    let x = this.props.x;
    let y = this.props.y;
    let d = [];

    let collector = this.props.halfedges.map(halfedge => {
      let moveXNext = x + halfedge.edge.va.x;
      let moveYNext = y - halfedge.edge.va.y;
      let lineXNext = x + halfedge.edge.vb.x;
      let lineYNext = y - halfedge.edge.vb.y;
      return `M ${moveXNext} ${moveYNext} L ${lineXNext} ${lineYNext}`;
    });

    return d.concat(collector).join(' ');
  }
  handleClick() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }
  render() {
    var color = this.state.isSelected ? '#888' : '#111';

    let d = this.generatePathData();
    // Example: <div style="position:absolute; left: 20px; top: 20px;"></div>
    return (
      <div style={{position: 'absolute', top: '0', left: '0'}} onClick={() => { this.handleClick() }}>
        <svg width={this.props.width} height={this.props.height}>
          <path d={d}
                stroke={this.props.color}
                strokeWidth={1}
                fill={color}
          />
        </svg>
      </div>
    );
  };
};

module.exports = Territory;
