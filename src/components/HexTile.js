import React, { Component } from 'react';
// import { ART } from 'react';

// const {
//   Surface,
//   Group,
//   Shape,
// } = ART;

//var HexTile = function(React, Shape, Path, PureRenderMixin) {
class HexTile extends Component {

	makeHexPath(size, centre) {
		//var path = new Path();
		var point = 0;
		var angle = null;
		var x = null;
		var y = null;

		while (point < 6) {
			angle = 2 * Math.PI / 6 * (point + 0.5);
			x = centre.x + size * Math.cos(angle);
			y = centre.y + size * Math.sin(angle);

			if (point === 0) {
				//path.moveTo(x, y);
			}
			else {
				//path.lineTo(x, y);
			}

			point = point + 1;
		}

		//return path;
		return null;
	}

	// return  React.createClass({
	constructor() {
		super();
		this.state = {
			isSelected: false,
			// displayName: 'HexTile',
			// getInitialState: function() {
			// 	return {
			// 		isSelected: false
			// 	};
			// }
		}
	};
	handleClick() {
		this.setState({
			isSelected: !this.state.isSelected
		});
	};
	render() {
		var color = this.state.isSelected ? '#888' : '#111';

		// TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
		var path = this.makeHexPath(this.props.size, this.props.centre);
		
		return (
			<div/>
        );
	};
	// });
};

//HexTile.$inject = ['React', 'Shape', 'Path', 'PureRenderMixin'];
module.exports = HexTile;
