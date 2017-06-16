var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var ControlMenu = require('./ControlMenu.js');
var SimMenu = require('./SizeMenu.js');

class App extends React.Component {
	constructor () {
		super();
		this.changeSize = this.changeSize.bind(this);
		this.changeSpeed = this.changeSpeed.bind(this);
		this.clearSimulation = this.clearSimulation.bind(this);
		this.countNeighbor = this.countNeighbor.bind(this);
		this.generateNewBoard = this.generateNewBoard.bind(this);
		this.runSimulation = this.runSimulation.bind(this);
		this.simulateLife = this.simulateLife.bind(this);
		this.pauseSimulation = this.pauseSimulation.bind(this);
		this.state = {
			cells: new Array(50 * 70),
			generation: 0,
			height: 50,
			paused: false,
			speed: "medium",
			width: 70
		};
	}

	/* Changes the height and width of the board in state */
	changeSize (height, width) {
		this.generateNewBoard(height, width);
	}

	changeSpeed (speed) {
		this.setState({
			speed: speed
		});
	}

	clearSimulation () {
			this.setState({
				generation: 0,
				paused: true
			});
	}

	/* Creates a new board by randomly adding alive cells. */
	generateNewBoard (height, width) {
		var newCells = new Array(height * width);
		for(var i = 0; i < newCells.length; i++) {
			newCells[i] = Math.random() >= 0.95;
		}

		this.setState({
			cells: newCells,
			generation: 0,
			height: height,
			width: width
		});
	}

	/* Start and manage simulation of 'life' via ticks */
	runSimulation () {
		var App = this;

		App.setState({
			paused: false
		});

		function updateGeneration () {
			if(App.state.paused) {
				clearInterval();
				return;
			}

			var currentGen = App.state.generation;
			var cells = App.simulateLife();
			App.setState({
				cells: cells,
				generation: currentGen + 1
			});
		}

		var speed = 1000;
		if(App.state.speed === "slow") {
			speed = 10000;
		} else if (App.state.speed === "fast") {
			speed = 100;
		}

		setInterval(updateGeneration, speed);
	}

	pauseSimulation () {
		this.setState({
			paused: true
		});
	}

	countNeighbor (cell) {
		if(cell) {
			return 1;
		} else {
			return 0;
		}
	}

	simulateLife () {
		if(this.state.generation === 0) {
			this.generateNewBoard(this.state.height, this.state.width);
		}

		var cells = this.state.cells;
		for(var i = 0; i < cells.length; i++) {
			var neighbors = 0;
			neighbors += this.countNeighbor(cells[i + this.state.width]);
			neighbors += this.countNeighbor(cells[i + this.state.width + 1]);
			neighbors += this.countNeighbor(cells[i + this.state.width - 1]);
			neighbors += this.countNeighbor(cells[i - this.state.width]);
			neighbors += this.countNeighbor(cells[i - this.state.width + 1]);
			neighbors += this.countNeighbor(cells[i - this.state.width - 1]);
			neighbors += this.countNeighbor(cells[i + 1]);
			neighbors += this.countNeighbor(cells[i - 1]);

			if(cells[i]) {
				if(neighbors < 2 || neighbors > 3) {
					cells[i] = false;
				}
			} else {
				if(neighbors === 2 || neighbors === 3) {
					cells[i] = true;
				}
			}
		}

		return cells;
	}

	//startSimulation needs updating
	render () {
		return(
			<div>
				<h1 className="text-center">
					Game of Life (ReactJS)
				</h1>
				<ControlMenu generation={this.state.generation}
					startSim={this.runSimulation} pauseSim={this.pauseSimulation}
					clearSim={this.clearSimulation} />
				<Board height={this.state.height} width={this.state.width}
					cells={this.state.cells} />
				<SimMenu changeSize={this.changeSize} changeSpeed={this.changeSpeed} />
			</div>
			);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
