var React = require('react');
var ReactDOM = require('react-dom');

class SizeMenu extends React.Component {
	render () {
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center">
					<button className="btn btn-default" type="button">
						Size: 50x30
					</button>
					<button className="btn btn-default" type="button">
						Size: 70x50
					</button>
					<button className="btn btn-default" type="button">
						Size: 100x80
					</button>
				</div>
			</div>
		);
	}
}

module.exports = SizeMenu;