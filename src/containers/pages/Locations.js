import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { deleteLocation } from '../../actions/locations';
import { vibrate } from '../../services/mobileBridgeManager';
import routs from '../../constants/routs';
import ActionBar from '../../components/ActionBar';
import NavigationBar from '../../components/NavigationBar';
import ListItem from '../../components/ListItem';

export class Locations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocation: -1,
			openWatchOptionsDialed: false,
			sortCategoryID: -1
		};

		this.renderListItem = this.renderListItem.bind(this);
	}

	renderListItem(location) {
		const { selectedLocation } = this.state;
		const selected = location.id === selectedLocation;

		return (
			<ListItem
				key={location.id}
				selected={selected}
				text={location.name}
				onClick={() => {
					selected
						? this.setState({ selectedLocation: -1 })
						: this.setState({ selectedLocation: location.id });
				}}
			/>
		);
	}

	renderLocationsList() {
		const { locations } = this.props;
		const { sortCategoryID } = this.state;

		if (locations.length === 0) {
			return (
				<Typography align="center" color="textSecondary" variant="h4">
					You need to create Locations
				</Typography>
			);
		}

		if (sortCategoryID > 0) {
			const sortedLocationByCategory = [...locations].filter(loc => loc.categoryID === sortCategoryID);

			return <List>{sortedLocationByCategory.map(location => this.renderListItem(location))}</List>;
		}

		return <List>{locations.map(location => this.renderListItem(location))}</List>;
	}

	render() {
		const { categories, deleteLocation, history } = this.props;
		const { selectedLocation, openWatchOptionsDialed, sortCategoryID } = this.state;

		return (
			<div className="flex-column page">
				<Dialog
					className="dialog"
					open={openWatchOptionsDialed}
					onClose={() => this.setState({ openWatchOptionsDialed: false })}
				>
					<DialogTitle>Choose option</DialogTitle>
					<Typography
						className="selectable-dialog"
						variant="h6"
						color="textSecondary"
						onClick={() => {
							vibrate();
							history.push(`${routs.WATCH_LOCATION_IN_MAP_BASE}${selectedLocation}`);
						}}
					>
						Watch on map
					</Typography>
					<Typography
						className="selectable-dialog"
						variant="h6"
						color="textSecondary"
						onClick={() => {
							if (selectedLocation <= 0) {
								this.setState({ openWatchOptionsDialed: false });
								return;
							}
							history.push(`${routs.WATCH_LOCATION_BASE}${selectedLocation}`);
						}}
					>
						See Details
					</Typography>
				</Dialog>
				<Typography className="sub-header title margin-left" variant="h5" color="primary">
					Locations
				</Typography>
				<ActionBar
					onAddClicked={() => history.push(routs.ADD_LOCATION)}
					onDeleteClicked={() => {
						if (selectedLocation > 0) {
							deleteLocation(selectedLocation);
							this.setState({ selectedLocation: -1 });
						}
					}}
					onViewClicked={() => {
						if (selectedLocation > 0) {
							this.setState({ openWatchOptionsDialed: true });
						}
					}}
					onEditClicked={() =>
						selectedLocation > 0 && history.push(`${routs.EDIT_LOCATION_BASE}${selectedLocation}`)
					}
				/>
				<Select
					className="select"
					value={sortCategoryID}
					onChange={e => {
						this.setState({ sortCategoryID: Number(e.target.value), selectedLocation: -1 });
					}}
				>
					<MenuItem value={-1}>
						<em>None</em>
					</MenuItem>
					{categories.map(category => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
				<div className="list-container">{this.renderLocationsList()}</div>
				<NavigationBar />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	locations: state.locations,
	categories: state.categories
});

const mapDispatchToProps = dispatch => {
	return {
		deleteLocation: locationID => dispatch(deleteLocation(locationID))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Locations);
