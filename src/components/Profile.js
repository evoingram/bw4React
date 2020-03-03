import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { useInput } from './CustomHooks/InputHook'
import styled from 'styled-components';
import loadForm from './old pages/Form.js';

const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 1em;
	padding: 1em 2em;
`;

const H1 = styled.h1`
	color: #383651;
	font-size: 2.5rem;
	margin-left: 3%;
	width: 100%;
	justify-content: center;
	text-align: center;
`;
const FormField = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
	flex-wrap: nowrap;
`;
const Div = styled.div`
	width: 60%;
	display: flex;
	flex-wrap: wrap;
	justify-content: right;
	margin-left: 15%;
`;
const Label = styled.label`
	width: 30%;
	margin: 0;
	padding: 0;
	justify-content: right;
	text-align: right;
	padding-right: 1%;
`;

const SCField = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
`;
const Center = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	margin: 0;
	padding: 0;
`;

const fieldLength = {
	width: '100%',
	margin: '0',
	padding: '0'
};
const Profile = ({ profile, values, errors, touched, status }) => {
	// fields: name, email, change password, usertype display, save button for acct changes

	values.name = profile.name;
	values.email = profile.email;
	values.password = profile.password;

	function updateProfile(profile, values, event) {
		profile = values;

		let config = {
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		};
		let url = `https://devdesk2eli.herokuapp.com/api/users/${profile.usersid}`;
		axios
			.put(url, profile, config)
			.then(res => {})
			.catch(err => {});
	}
	return (
		<Center>
			<H1>Profile Information:</H1>
			<Form>
				<Div>
					{touched.name && errors.name && <p>{errors.name}</p>}
					{touched.email && errors.email && <p>{errors.email}</p>}
					{touched.password && errors.password && <p>{errors.password}</p>}
					<FormField>
						<Label>Name:</Label>
						<SCField>
							<Field
								type="text"
								name="name"
								placeholder={profile.name}
								value={values.name}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Email:</Label>
						<SCField>
							<Field
								type="email"
								name="email"
								placeholder={profile.email}
								value={values.email}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Password:</Label>
						<SCField>
							<Field
								type="password"
								name="password"
								placeholder="Password"
								value={values.password}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<Button type="submit" onClick={event => updateProfile(profile, values, event)}>
						Save
					</Button>
					{touched.password && errors.password && <p>{errors.password}</p>}
				</Div>
			</Form>
		</Center>
	);
};

const FormikForm = withFormik({
	mapPropsToValues({ name, email, password }) {
		return {
			name: name || '',
			email: email || '',
			password: password || ''
		};
	},
	// validation schema
	validationSchema: Yup.object().shape({
		name: Yup.string()
			.min(5, 'Name must be at least five characters.')
			.required('Name is required'),
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be 6 characters or longer')
			.required('Password is required')
	}),

	handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
		axios
			.get('https://devdesk2eli.herokuapp.com/api/users?email=' + values.email, values)
			.then(res => {
				setStatus(res.data);
				resetForm();
				setSubmitting(false);
				loadForm();
			})
			.catch(err => {
				setSubmitting(false);
			});
	}
})(Profile);

export default FormikForm;
