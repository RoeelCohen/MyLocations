import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import { deleteCategory } from '../../actions/categories';
import NavigationBar from '../../components/NavigationBar';
import ActionBar from '../../components/ActionBar';
import ListItem from '../../components/ListItem';
import routs from '../../constants/routs';

export class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedCategory: 0 };
		this.renderListItem = this.renderListItem.bind(this);
	}

	renderListItem(category) {
		const { selectedCategory } = this.state;
		const selected = category.id === selectedCategory;

		return (
			<ListItem
				key={category.id}
				selected={selected}
				text={category.name}
				onClick={() => {
					selected
						? this.setState({ selectedCategory: -1 })
						: this.setState({ selectedCategory: category.id });
				}}
			/>
		);
	}

	render() {
		const { categories, history } = this.props;
		const { selectedCategory } = this.state;

		return (
			<div className="flex-column page">
				<Typography className="sub-header title margin-left" variant="h5" color="primary">
					Categories
				</Typography>
				<ActionBar
					onAddClicked={() => history.push(routs.ADD_CATEGORY)}
					onDeleteClicked={() => {
						if (selectedCategory > 0) {
							this.props.deleteCategory(selectedCategory);
							this.setState({ selectedCategory: -1 });
						}
					}}
					onEditClicked={() =>
						selectedCategory > 0 && history.push(`${routs.EDIT_CATEGORY_BASE}${selectedCategory}`)
					}
					onViewClicked={() => {
						if (selectedCategory > 0) {
							history.push(`${routs.WATCH_CATEGORY_BASE}${selectedCategory}`);
						}
					}}
				/>
				<List className="list">
					{categories.length === 0 ? (
						<Typography align="center" color="textSecondary" variant="h4">
							You need to create categories
						</Typography>
					) : (
						categories.map(category => this.renderListItem(category))
					)}
				</List>
				<NavigationBar />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories
});

const mapDispatchToProps = dispatch => {
	return {
		deleteCategory: categoryID => dispatch(deleteCategory(categoryID))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Categories);
