import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';

const styles = {
	actionButton: {
		fontSize: '11px'
	}
};

const ICON = {
	add: <AddIcon />,
	edit: <EditIcon />,
	map: <MapIcon />,
	delete: <DeleteIcon />
};

const ResponsiveActionButton = ({ text, iconName, onClick, classes }) => {
	return (
		<Fragment>
			<Hidden xsDown>
				<Button
					className={classes.actionButton}
					size="small"
					variant="contained"
					color="secondary"
					onClick={onClick}
				>
					{text}
					{ICON[iconName]}
				</Button>
			</Hidden>
			<Hidden smUp>
				<Fab size="small" color="secondary" onClick={onClick}>
					{ICON[iconName]}
				</Fab>
			</Hidden>
		</Fragment>
	);
};

ResponsiveActionButton.defaultProps = {
	text: 'Add',
	iconName: 'add',
	onClick: () => {}
};

export default withStyles(styles)(ResponsiveActionButton);
