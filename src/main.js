var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var ControlMenu = require('./ControlMenu.js');
var SizeMenu = require('./SizeMenu.js');

class App extends React.Component {
	constructor () {
		super();
		this.changeSize = this.changeSize.bind(this);
		this.generateNewBoard = this.generateNewBoard.bind(this);
		this.state = {
			cells: new Array(50 * 70),
			height: 50,
			width: 70
		};
	}

	/* Changes the height and width of the board in state */
	changeSize (height, width) {
		this.generateNewBoard(height, width);
	}

	/* Creates a new board by randomly adding alive cells. */
	generateNewBoard (height, width) {
		var newCells = new Array(height * width);
		for(var i = 0; i < newCells.length; i++) {
			newCells[i] = Math.random() >= 0.5;
		}

		this.setState({
			cells: newCells,
			height: height,
			width: width
		});
	}

	render () {
		return(
			<div>
				<h1 className="text-center">
					Game of Life (ReactJS)
				</h1>
				<ControlMenu />
				<Board height={this.state.height} width={this.state.width}
					cells={this.state.cells}/>
				<SizeMenu changeSize={this.changeSize} />
			</div>
			);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
