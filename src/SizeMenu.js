var React = require('react');
var ReactDOM = require('react-dom');

class SizeMenu extends React.Component {
	render () {
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center">
					<button className="btn btn-default"
						id="50x30" type="button"
						onClick={(e) => {this.props.handleClick(e)}}>
						Size: 50x30
					</button>
					<button className="btn btn-default"
						id="70x50" type="button"
						onClick={(e) => {this.props.handleClick(e)}}>
						Size: 70x50
					</button>
					<button className="btn btn-default"
						id="100x80" type="button"
						onClick={(e) => {this.props.handleClick(e)}}>
						Size: 100x80
					</button>
				</div>
			</div>
		);
	}
}

class SpeedMenu extends React.Component {
	render () {
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center">
					<button className="btn btn-default" id="slow"
									onClick={(e) => this.props.changeSpeed(e.target.id)}>
						Slow
					</button>
					<button className="btn btn-default" id="medium"
									onClick={(e) => this.props.changeSpeed(e.target.id)}>
						Medium
					</button>
					<button className="btn btn-default" id="fast"
									onClick={(e) => this.props.changeSpeed(e.target.id)}>
						Fast
					</button>
				</div>
			</div>
		);
	}
}

class SimMenu extends React.Component {
	constructor (props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		if(e.target.id === "50x30") {
			this.props.changeSize(30,50);
		} else if(e.target.id === "70x50") {
			this.props.changeSize(50,70);
		} else if(e.target.id === "100x80") {
			this.props.changeSize(80,100);
		} else {
			//Throw an error.
		}
	}

	render () {
		return (
			<div>
				<SizeMenu handleClick={this.handleClick} />
				<SpeedMenu changeSpeed={this.props.changeSpeed} />
			</div>
		);
	}
}

module.exports = SimMenu;
