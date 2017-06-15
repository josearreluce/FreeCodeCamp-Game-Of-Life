var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var ControlMenu = require('./ControlMenu.js');
var SizeMenu = require('./SizeMenu.js');

class App extends React.Component {
	constructor () {
		super();
		this.changeSize = this.changeSize.bind(this);
		this.state = {
			height: 50,
			width: 70
		};
	}

	changeSize (height, width) {
		this.setState({
			height: height,
			width: width
		});
	}

	render () {
		var cells = new Array(this.state.width * this.state.height);
		return(
			<div>
				<h1 className="text-center">
					Game of Life (ReactJS)
				</h1>
				<ControlMenu />
				<Board height={this.state.height} width={this.state.width}
					cells={cells}/>
				<SizeMenu changeSize={this.changeSize} />
			</div>
			);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
