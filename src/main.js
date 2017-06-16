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
		this.generateNewBoard = this.generateNewBoard.bind(this);
		this.runSimulation = this.runSimulation.bind(this);
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
			newCells[i] = Math.random() >= 0.8;
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
			App.setState({
				generation: currentGen + 1
			});
		}

		var speed = 100;
		if(App.state.speed === "slow") {
			speed = 1000;
		} else if (App.state.speed === "fast") {
			speed = 10;
		}

		setInterval(updateGeneration, speed);
	}

	pauseSimulation () {
		this.setState({
			paused: true
		});
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
