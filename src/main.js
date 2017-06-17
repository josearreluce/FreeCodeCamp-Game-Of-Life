var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var ControlMenu = require('./ControlMenu.js');
var SimMenu = require('./SizeMenu.js');

function generateNewBoard (height, width) {
	var newCells = new Array(height * width);
	for(var i = 0; i < newCells.length; i++) {
		newCells[i] = Math.random() >= 0.95;
	}

	return newCells;
}

function simulation (App, paused, generation, simulationFunction, speed) {
	function updateGeneration (paused, generation, simulationFunction) {
		if(paused) {
			clearInterval();
			return;
		}

		var currentGen = generation + 1;
		var cells = simulationFunction();
		App.setState({
			cells: cells,
			generation: currentGen
		});
	}

	var speed = 1000;
	if(speed === "slow") {
		speed = 10000;
	} else if (speed === "fast") {
		speed = 100;
	}

	setInterval(updateGeneration, speed);
}

class App extends React.Component {
	constructor () {
		super();
		this.changeSize = this.changeSize.bind(this);
		this.changeSpeed = this.changeSpeed.bind(this);
		this.clearSimulation = this.clearSimulation.bind(this);
		this.countNeighbor = this.countNeighbor.bind(this);
		this.newBoard = this.newBoard.bind(this);
		this.runSimulation = this.runSimulation.bind(this);
		this.simulateLife = this.simulateLife.bind(this);
		this.pauseSimulation = this.pauseSimulation.bind(this);

		var cellsBoard = generateNewBoard(50,70);
		this.state = {
			cells: cellsBoard,
			generation: 0,
			height: 50,
			paused: false,
			speed: "medium",
			width: 70
		}
	}

	/* Changes the height and width of the board in state */
	changeSize (height, width) {
		this.newBoard(height, width);
		this.runSimulation();
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
	newBoard (height, width) {
		var newCells = generateNewBoard(height, width);

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

	produceNeighbors(i, w) {
		var neighbors = [i + w, i + w - 1, i + w + 1,
										 i - w, i - w - 1, i - w + 1,
										 i + 1, i - 1];
	  return neighbors;
	}

	simulateLife () {
		var cells = this.state.cells;
		var newCells = [];
		for(var i = 0; i < cells.length; i++) {
			var neighborCount = 0;
			var neighbors = this.produceNeighbors(i, this.state.width);
			for(var j = 0; j < neighbors.length; j++) {
				neighborCount += this.countNeighbor(cells[neighbors[j]]);
			}

			if(cells[i]) {
				if(neighborCount < 2 || neighborCount > 3) {
					newCells.push(false);
				} else {
					newCells.push(true);
				}
			} else {
				if(neighborCount === 2 || neighborCount === 3) {
					newCells.push(true);
				} else {
					newCells.push(false);
				}
			}
		}

		return newCells;
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
