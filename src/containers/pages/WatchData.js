import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { getElementFromArrayOfObjectsByID } from '../../services/utils';

export class WatchData extends Component {
	constructor(props) {
		super(props);

		const type = props.match.params.type;
		const obj =
			type === 'category'
				? getElementFromArrayOfObjectsByID(props.categories, props.match.params.id)
				: getElementFromArrayOfObjectsByID(props.locations, props.match.params.id);

		this.state = {
			obj,
			type
		};

		this.renderField = this.renderField.bind(this);
	}

	renderField(key) {
		return (
			<div key={key} className="key-value-container">
				<Typography className="key" gutterBottom>
					{key}:
				</Typography>
				<Typography className="value" color="textSecondary" gutterBottom>
					{this.state.obj[key]}
				</Typography>
			</div>
		);
	}

	render() {
		const keys = Object.keys(this.state.obj);

		return (
			<div>
				<Typography className="sub-header title" variant="h5" color="primary">
					{this.state.type}
				</Typography>
				{keys.map(key => this.renderField(key))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	locations: state.locations,
	categories: state.categories
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WatchData);
