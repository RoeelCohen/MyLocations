import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import routs from '../../constants/routs';
import { addCategory } from '../../actions/categories';
import { isEmptyString } from '../../services/utils';
import FormField from '../../components/FormField';

export class AddCategory extends Component {
	state = {
		fieldEdited: false,
		forceShowErrors: false,
		categoryName: ''
	};

	render() {
		const { addCategory, history } = this.props;
		const { fieldEdited, categoryName, forceShowErrors } = this.state;
		const shouldShowError = (fieldEdited || forceShowErrors) && isEmptyString(categoryName);

		return (
			<div className="flex-column flex-start form-container">
				<Typography className="sub-header title" variant="h5" color="primary">
					Add Category
				</Typography>
				<FormField
					label="Category Name"
					error={shouldShowError}
					errorMessage={shouldShowError ? 'Required field' : ''}
					onChange={e => {
						this.setState({ fieldEdited: true, categoryName: e.target.value });
					}}
				/>
				<Button
					className="self-flex-end send-form-button"
					color="primary"
					onClick={() => {
						if (isEmptyString(categoryName)) {
							this.setState({ forceShowErrors: true });
							return;
						}
						addCategory(categoryName);
						history.push(routs.CATEGORIES);
					}}
				>
					Add Category
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
	return {
		addCategory: categoryName => dispatch(addCategory(categoryName))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddCategory);
