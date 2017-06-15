var React = require('react');
var ReactDOM = require('react-dom');

class Cell extends React.Component {
	render () {
		var cellHeight = Math.floor(450 / this.props.height);
		var cellWidth = Math.floor(700 / this.props.width);

		var cellStyle = {
			border: "0.5px solid black",
			display: "inline-block",
			height: String(cellHeight) + "px",
			width: String(cellWidth) + "px"
		};

		var cellId = "cell_" + this.props.num;
		return <div className="cell" id={cellId}
				style={cellStyle}></div>;
	}
}

class Row extends React.Component {
	render () {
		var cells = [];
		for(var i = 0; i < this.props.cells.length; i++) {
			cells.push(<Cell key={i}
						cell={this.props.cells[i]} num={this.props.indexes[i]}
						height={this.props.height} width={this.props.width} />);
		}

		return <div className="row">{cells}</div>;
	}
}

class Board extends React.Component {
	render() {
		var rows = [];
		for(var i = 0; i < this.props.cells.length; i += this.props.width) {
			var rowCells = [];
			var indexes = [];
			for(var j = i; j < i + this.props.width; j++) {
				rowCells.push(this.props.cells[j]);
				indexes.push(j);
			}

			rows.push(<Row key={i} cells={rowCells} indexes={indexes}
									height={this.props.height}
									width={this.props.width}/>);
		}

		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-3" id="container">
					{rows}
				</div>
			</div>
		);
	}
}

module.exports = Board;
