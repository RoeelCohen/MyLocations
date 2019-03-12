import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import routs from '../../constants/routs';
import { addLocation } from '../../actions/locations';
import { isEmptyString } from '../../services/utils';
import LocationForm from '../../components/LocationForm';

export class AddLocation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nameFieldEdited: false,
			addressFieldEdited: false,
			latFieldEdited: false,
			lonFieldEdited: false,
			categoryEdited: false,
			forceShowErrors: false,
			name: '',
			address: '',
			lat: '',
			lon: '',
			categoryID: -1
		};

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
		const { name, address, lat, lon, forceShowErrors } = this.state;
		const { nameFieldEdited, addressFieldEdited, latFieldEdited, lonFieldEdited } = this.state;
		const { categoryID, categoryEdited } = this.state;

		return {
			nameError: (nameFieldEdited || forceShowErrors) && isEmptyString(name),
			addressError: (addressFieldEdited || forceShowErrors) && isEmptyString(address),
			latError: (latFieldEdited || forceShowErrors) && isEmptyString(lat),
			lonError: (lonFieldEdited || forceShowErrors) && isEmptyString(lon),
			categoryError: (categoryEdited || forceShowErrors) && Number(categoryID) === -1
		};
	}

	render() {
		const { addLocation, history } = this.props;
		const { name, address, lat, lon, categoryID } = this.state;

		const formProps = { ...this.props, ...this.state, ...this.getFieldsErrors() };

		return (
			<div className="flex-column flex-start form-container">
				<Typography className="sub-header title" variant="h5" color="primary">
					Add Location
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
							addLocation({
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
					Add Category
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories
});

const mapDispatchToProps = dispatch => {
	return {
		addLocation: location => dispatch(addLocation(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddLocation);
