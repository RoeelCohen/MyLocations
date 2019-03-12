import React, { Component } from 'react';

import ResponsiveActionButton from '../components/ResponsiveActionButton';

class ActionBar extends Component {
	constructor(props) {
		super(props);

		this.state = { isDialogOpen: false };

		this.onDialogOpened = this.onDialogOpened.bind(this);
		this.onDialogClosed = this.onDialogClosed.bind(this);
	}

	onDialogOpened() {
		this.setState({ isDialogOpen: true });
	}

	onDialogClosed() {
		this.setState({ isDialogOpen: false });
	}

	render() {
		const { onAddClicked, onEditClicked, onViewClicked, onDeleteClicked } = this.props;
		return (
			<div className="flex-row action-bar-container">
				<ResponsiveActionButton text="Add" iconName="add" onClick={onAddClicked} />
				<ResponsiveActionButton text="Edit" iconName="edit" onClick={onEditClicked} />
				<ResponsiveActionButton text="Watch" iconName="map" onClick={onViewClicked} />
				<ResponsiveActionButton text="Delete" iconName="delete" onClick={onDeleteClicked} />
			</div>
		);
	}
}

ActionBar.defaultProps = {
	onAddClicked: () => {},
	onEditClicked: () => {},
	onViewClicked: () => {},
	onDeleteClicked: () => {}
};

export default ActionBar;
