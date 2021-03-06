import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" color="inherit">
					My Locations
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
