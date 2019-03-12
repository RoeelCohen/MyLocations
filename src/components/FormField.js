import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormField = ({ label, error, onChange, errorMessage, defaultValue }) => {
	return (
		<TextField
			defaultValue={defaultValue}
			error={error}
			className="input"
			label={label}
			onChange={onChange}
			margin="normal"
			helperText={errorMessage}
		/>
	);
};

FormField.defaultProps = {
	error: false,
	label: 'Label',
	onChange: () => {}
};

export default FormField;
