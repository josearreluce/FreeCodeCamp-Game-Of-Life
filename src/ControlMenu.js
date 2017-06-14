var React = require('react');
var ReactDOM = require('react-dom');

class ControlMenu extends React.Component {
	render () {
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center">
					<button className="btn btn-default" type="button"> Run </button>
					<button className="btn btn-default" type="button"> Pause </button>
					<button className="btn btn-default" type="button"> Clear </button>
				</div>
			</div>
		);
	}
}

module.exports = ControlMenu;