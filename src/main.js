var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var ControlMenu = require('./ControlMenu.js');
var SizeMenu = require('./SizeMenu.js');

var cells = new Array(70 * 50);
class App extends React.Component {
	render () {
		return(
			<div>
				<h1 className="text-center"> 
					Game of Life (ReactJS) 
				</h1>
				<ControlMenu />				
				<Board cells={cells}/>
				<SizeMenu />
			</div>
			);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);