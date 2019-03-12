import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import routs from '../../constants/routs';
import { editCategory } from '../../actions/categories';
import { isEmptyString, getElementFromArrayOfObjectsByID } from '../../services/utils';
import FormField from '../../components/FormField';

export class EditCategory extends Component {
	constructor(props) {
		super(props);
		let category = getElementFromArrayOfObjectsByID(props.categories, Number(props.match.params.id));

		if (!category) {
			category = {
				id: -1,
				name: 'category'
			};
		}

		this.state = { ...category, forceShowErrors: false };
	}

	render() {
		const { editCategory, history } = this.props;
		const { name, id, forceShowErrors } = this.state;
		const shouldShowError = forceShowErrors && isEmptyString(name);

		return (
			<div className="flex-column flex-start form-container">
				<Typography className="sub-header title" variant="h5" color="primary">
					Edit Category
				</Typography>
				<FormField
					defaultValue={name}
					label="Category Name"
					error={shouldShowError}
					errorMessage={shouldShowError ? 'Required field' : ''}
					onChange={e => {
						this.setState({ fieldEdited: true, name: e.target.value });
					}}
				/>
				<Button
					className="self-flex-end send-form-button"
					color="primary"
					onClick={() => {
						if (isEmptyString(name)) {
							this.setState({ forceShowErrors: true });
							return;
						}
						editCategory({ id, name });
						history.push(routs.CATEGORIES);
					}}
				>
					Edit Category
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
		editCategory: category => dispatch(editCategory(category))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCategory);
