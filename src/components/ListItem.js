import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		fontSize: '0.5rem',
		height: '40px',
		'&:hover': {
			backgroundColor: theme.palette.primary.xLight
		}
	}
});

const CustomListItem = ({ key, selected, text, onClick, classes }) => {
	return (
		<Fragment key={key}>
			<ListItem button divider classes={{ root: classes.root }} selected={selected} onClick={onClick}>
				<ListItemText>{text}</ListItemText>
				<Checkbox align="right" checked={selected} />
			</ListItem>
		</Fragment>
	);
};

export default withStyles(styles)(CustomListItem);
