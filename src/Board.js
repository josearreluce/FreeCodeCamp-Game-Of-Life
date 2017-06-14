var React = require('react');
var ReactDOM = require('react-dom');

class Cell extends React.Component {
	render () {
		var cellStyle = {border: "1px solid black"};
		var cellId = "cell_" + this.props.num; 
		return <div className="cell" id={cellId}
				style={{border: "1px solid black"}}></div>;
	}
}

class Row extends React.Component {
	render () {
		var cells = [];
		for(var i = 0; i < this.props.cells.length; i++) {
			cells.push(<Cell key={i} 
						cell={this.props.cells[i]} num={this.props.indexes[i]} />);
		}

		return <div className="row">{cells}</div>;
	}
}

class Board extends React.Component {
	render() {
		var rows = [];
		for(var i = 0; i < this.props.cells.length; i += 70) {
			var rowCells = [];
			var indexes = [];
			for(var j = i; j < i + 70; j++) {
				rowCells.push(this.props.cells[j]);
				indexes.push(j);
			}

			rows.push(<Row key={i} cells={rowCells} indexes={indexes}/>);
		}

		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-3">
					{rows}
				</div>
			</div>
		);
	}
}

module.exports = Board;