import React from 'react';

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

module.exports = Box;