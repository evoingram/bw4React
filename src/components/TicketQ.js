import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import loadForm from './Hide.js';

const Div1 = styled.div`
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 2%;
	padding-bottom: 2%;
	margin: 0;
	border-bottom: 2px solid #383651;
	border-top: 2px solid #383651;
`;
const H1 = styled.h1`
	color: #383651;
	font-size: 2.5rem;
	width: 100%;
	justify-content: center;
	text-align: center;
`;
const Div = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const FormField = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
	flex-wrap: nowrap;
`;
const Label = styled.label`
	width: 40%;
	margin: 0;
	padding: 0;
	justify-content: right;
	text-align: right;
	padding-right: 1%;
	text-decoration: none;
`;
const SCField = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
`;
const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 1em;
	padding: 1em 2em;
`;
const ButtonRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	justify-content: space-evenly;
	margin: 0;
	padding: 0;
`;

const fieldLength = {
	width: '97%',
	margin: '0',
	padding: '0'
};
const Ticket = ({ profile, ticket, values, errors, touched, isSubmitting, status }) => {
	if (values.statusesid === 1) {
		values.statusText = 'queue';
	} else if (values.statusesid === 2) {
		values.statusText = 'resolved';
	} else {
		values.statusText = 'in progress';
	}
	values.title = ticket.title;
	values.category = ticket.category;
	values.description = ticket.description;
	// https://devdesk2eli.herokuapp.com/api
	function updateTicket(ticketID, currentTicketStatus, helperID, event) {
		values.helperid = helperID;

		let url = `https://devdesk2eli.herokuapp.com/api/tickets/${ticketID}`;
		axios.defaults.headers.put['Content-Type'] = 'application/json';
		let axiosConfig = {
			url: `https://devdesk2eli.herokuapp.com/api/tickets/${ticketID}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token')
			},
			body: values
		};
		if (values.statusesid === 1) {
			values.statusText = 'queue';
		} else if (values.statusesid === 2) {
			values.statusText = 'resolved';
		} else {
			values.statusText = 'in progress';
		}
		axios
			.put(
				url,
				{
					status: values.statusText
				},
				axiosConfig
			)
			.then(res => {
				if (values.statusesid === 1) {
					values.statusText = 'queue';
				} else if (values.statusesid === 2) {
					values.statusText = 'resolved';
				} else {
					values.statusText = 'in progress';
				}
			})
			.catch(err => {
				if (values.statusesid === 1) {
					values.statusText = 'queue';
				} else if (values.statusesid === 2) {
					values.statusText = 'resolved';
				} else {
					values.statusText = 'in progress';
				}
			});
	}

	return (
		<Div1>
			<H1>Ticket:</H1>
			<Form>
				{touched.title && errors.title && <p>{errors.title}</p>}
				{touched.date && errors.date && <p>{errors.date}</p>}
				{touched.category && errors.category && <p>{errors.category}</p>}
				{touched.statusText && errors.statusText && <p>{errors.statusText}</p>}
				{touched.description && errors.description && <p>{errors.description}</p>}
				<Div>
					<FormField>
						<Label>Title:</Label>
						<SCField>
							<Field
								type="text"
								name="title"
								placeholder={ticket.title}
								value={values.title}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Category:</Label>
						<SCField>
							<Field
								type="text"
								name="category"
								placeholder={values.category}
								value={values.category}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Status:</Label>
						<SCField>
							<Field
								type="text"
								name="statusT"
								placeholder={values.statusText}
								value={values.statusText}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>What Student Tried:</Label>
						<SCField>
							<Field
								type="text"
								name="description"
								placeholder={values.description}
								value={values.description}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
				</Div>
				<ButtonRow>
					<Button type="submit">Save</Button>
					<Button
						type="submit"
						id={'btnR' + ticket.id}
						onClick={event => updateTicket(ticket.id, profile.id, event)}
					>
						Help Student
					</Button>
				</ButtonRow>
			</Form>
		</Div1>
	);
};

const FormikForm = withFormik({
	mapPropsToValues({ submitid, date, title, category, statusT, description }) {
		return {
			submitid: submitid || '',
			date: date || '',
			title: title || '',
			category: category || '',
			statusT: statusT || '',
			description: description || ''
		};
	},
	// validation schema
	validationSchema: Yup.object().shape({
		title: Yup.string()
			.min(2, 'Title must be two characters or longer.')
			.required('Title is required'),
		category: Yup.string()
			.min(2, 'Category must be two characters or longer.')
			.required('Category is required'),
		description: Yup.string()
			.min(6, 'Description must be 6 characters or longer')
			.required('Description is required')
	}),

	handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
		let config = {
			headers: {
				authorization: localStorage.getItem('token')
			}
		};
		axios
			.get('https://devdesk2eli.herokuapp.com/api/tickets/queue', config)
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
})(Ticket);

export default FormikForm;
