import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getElementFromArrayOfObjectsByID } from '../../services/utils';

export class LocationOnMap extends Component {
	constructor(props) {
		super(props);

		const location = getElementFromArrayOfObjectsByID(props.locations, Number(props.match.params.id));

		this.state = {
			...location
		};
	}

	componentDidMount() {
		const google = window.google;
		const { lat, lon } = this.state;

		new google.maps.Map(this.refs.map, {
			zoom: 15,
			center: {
				lat: lat,
				lng: lon
			}
		});
	}

	render() {
		return <div className="map-container" ref="map" />;
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
)(LocationOnMap);
