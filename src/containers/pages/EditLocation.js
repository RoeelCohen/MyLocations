import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import routs from '../../constants/routs';
import { editLocation } from '../../actions/locations';
import { isEmptyString, getElementFromArrayOfObjectsByID } from '../../services/utils';
import LocationForm from '../../components/LocationForm';

export class EditLocation extends Component {
	constructor(props) {
		super(props);

		let location = getElementFromArrayOfObjectsByID(props.locations, Number(props.match.params.id));

		if (!location) {
			location = {
				id: -1,
				name: 'name',
				address: 'address',
				lat: 'lat',
				lon: 'lon',
				categoryID: -1
			};
		}

		this.state = { ...location, forceShowErrors: false };

		this.isValidLocation = this.isValidLocation.bind(this);
		this.getFieldsErrors = this.getFieldsErrors.bind(this);
	}

	isValidLocation() {
		const { name, address, lat, lon, categoryID } = this.state;
		return (
			!isEmptyString(name) &&
			!isEmptyString(address) &&
			!isEmptyString(lat) &&
			!isEmptyString(lon) &&
			categoryID > 0
		);
	}

	getFieldsErrors() {
		const { name, address, lat, lon, categoryID, forceShowErrors } = this.state;

		return {
			nameError: forceShowErrors && isEmptyString(name),
			addressError: forceShowErrors && isEmptyString(address),
			latError: forceShowErrors && isEmptyString(lat),
			lonError: forceShowErrors && (isEmptyString(lon) || typeof lon !== 'number'),
			categoryError: forceShowErrors && Number(categoryID) === -1
		};
	}

	render() {
		const { editLocation, history } = this.props;
		const { id, name, address, lat, lon, categoryID } = this.state;

		const formProps = { ...this.props, ...this.state, ...this.getFieldsErrors() };

		if (categoryID === -1) {
			return <div>You Shall Not Pass =D</div>;
		}

		return (
			<div className="flex-column flex-start form-container">
				<Typography className="sub-header title" variant="h5" color="primary">
					Edit Location
				</Typography>
				<LocationForm
					onNameChanged={e => this.setState({ nameFieldEdited: true, name: e.target.value })}
					onAddressChanged={e => this.setState({ addressFieldEdited: true, address: e.target.value })}
					onLatChanged={e => this.setState({ latFieldEdited: true, lat: e.target.value })}
					onLonChanged={e => this.setState({ lonFieldEdited: true, lon: e.target.value })}
					onCategoryChanged={e => this.setState({ categoryID: e.target.value })}
					{...formProps}
				/>
				<Button
					className="self-flex-end send-form-button"
					color="primary"
					onClick={() => {
						if (this.isValidLocation()) {
							editLocation({
								id,
								name,
								address,
								lat: parseFloat(lat),
								lon: parseFloat(lon),
								categoryID: parseFloat(categoryID)
							});
							history.push(routs.LOACTIONS);
							return;
						}

						this.setState({ forceShowErrors: true });
					}}
				>
					Update Category
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories,
	locations: state.locations
});

const mapDispatchToProps = dispatch => {
	return {
		editLocation: location => dispatch(editLocation(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditLocation);
