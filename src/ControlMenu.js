var React = require('react');
var ReactDOM = require('react-dom');

class ControlMenu extends React.Component {
	render () {
		var generation = this.props.generation === -1 ? 0 : this.props.generation;
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center">
					<button className="btn btn-default"
									onClick={this.props.startSim} type="button">
						Run
					</button>
					<button className="btn btn-default"
									onClick={this.props.pauseSim} type="button">
						Pause
					</button>
					<button className="btn btn-default"
									onClick={this.props.clearSim} type="button">
						Clear
					</button>
					<span> Generation: {generation} </span>
				</div>
			</div>
		);
	}
}

module.exports = ControlMenu;
