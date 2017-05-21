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

    let v = this.props.halfedges[0].getStartpoint();
    let d = [`M ${x + v.x} ${y - v.y}`];

    let collector = this.props.halfedges.map(halfedge => {
      v = halfedge.getEndpoint();
      let lineXNext = x + v.x;
      let lineYNext = y - v.y;
      return `L ${lineXNext} ${lineYNext}`;
    });

    return d.concat(collector).join(' ');
  }
  handleClick() {
    console.log('clicking for ', this);
    this.setState({
      isSelected: !this.state.isSelected
    });
  }
  tender() {
    return (
      <div>
        (w: {this.props.width}, h: {this.props.height}, color: {this.props.colors.unselected}, unselected: {this.props.colors.selected})
      </div>
    );
  }
  render() {
    var color = this.state.isSelected ? this.props.colors.selected : this.props.colors.unselected;

    let d = this.generatePathData();
    console.log('d: ', d);
    console.log('which color used: ', color);
    // Example: <div style="position:absolute; left: 20px; top: 20px;"></div>
    return (
      <div style={{position: 'absolute', top: '0', left: '0', width: this.props.width + 'px', height: this.props.height + 'px'}} onClick={() => { this.handleClick() }}>
        <svg width={this.props.width} height={this.props.height}>
        {/*<svg>*/}
          <path d={d}
                stroke={color}
                strokeWidth={1}
                fill={color}
          />
        </svg>
      </div>
    );
  }
};

module.exports = Territory;
