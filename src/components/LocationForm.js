import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FormField from './FormField';
import routs from '../constants/routs';

export default props => {
	const { name, address, lat, lon } = props;
	const { nameError, addressError, latError, lonError } = props;
	const { onNameChanged, onAddressChanged, onLatChanged, onLonChanged } = props;

	return (
		<Fragment>
			<FormField
				defaultValue={name}
				label="Location Name"
				error={nameError}
				errorMessage={nameError ? 'Required field' : ''}
				onChange={onNameChanged}
			/>
			<FormField
				defaultValue={address}
				label="Address"
				error={addressError}
				errorMessage={addressError ? 'Required field' : ''}
				onChange={onAddressChanged}
			/>
			<FormField
				defaultValue={lat}
				label="Lat"
				error={latError}
				errorMessage={latError ? 'Required field' : ''}
				onChange={onLatChanged}
			/>
			<FormField
				defaultValue={lon}
				label="Lon"
				error={lonError}
				errorMessage={lonError ? 'Required field' : ''}
				onChange={onLonChanged}
			/>
			<CategorySelect {...props} />
		</Fragment>
	);
};

const CategorySelect = ({ categories, categoryError, categoryID, onCategoryChanged }) => {
	return !categories || categories.length === 0 ? (
		<Link to={routs.ADD_CATEGORY}>
			You don't have any categories.. Click here to create a category first
		</Link>
	) : (
		<Select error={categoryError} className="select" value={categoryID} onChange={onCategoryChanged}>
			<MenuItem value={-1}>
				<em>None</em>
			</MenuItem>
			{categories.map(category => (
				<MenuItem key={category.id} value={category.id}>
					{category.name}
				</MenuItem>
			))}
		</Select>
	);
};
