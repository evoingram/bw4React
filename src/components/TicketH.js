import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import loadForm from './Hide.js';

const Div1 = styled.div`
	width: 80%;
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
const Ticket = ({ ticket, values, errors, touched, isSubmitting, status }) => {
	values.title = ticket.title;
	values.category = ticket.category;
	values.statusT = ticket.status;
	values.description = ticket.description;

	function updateTicket(ticketID, currentTicketStatus, event) {
		console.log('currentTicketStatus = ' + currentTicketStatus);
		if (currentTicketStatus === 'resolved' && event.target.id === 'btnR' + ticketID) {
			ticket.status = 'resolved';
			values.statusesid = 2;
		}
		if (currentTicketStatus === 'queue' && event.target.id === 'btnQ' + ticketID) {
			ticket.status = 'queue';
			values.statusesid = 1;
		}
		let config = {
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		};		
		console.log("values before put = " + values);
		axios
			.put(`http://devdesk2eli.herokuapp.com/api/tickets/${ticket.ticketsid}`, {helperid: ticket.helperid}, config)
			.then(res => {
				console.log(res);
			})
			.catch(err => {console.log("values before put = " + values);});
	}
	return (
		<Div1>
			<H1>Ticket:</H1>
			<Form>
				{touched.title && errors.title && <p>{errors.title}</p>}
				{touched.date && errors.date && <p>{errors.date}</p>}
				{touched.category && errors.category && <p>{errors.category}</p>}
				{touched.statusT && errors.statusT && <p>{errors.statusT}</p>}
				{touched.description && errors.description && <p>{errors.description}</p>}
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
				<ButtonRow>
					<Button type="submit">Save</Button>
					<Button
						type="submit"
						id={'btnR' + ticket.id}
						onClick={event => updateTicket(ticket.ticketsid, 'resolved', event)}
					>
						Resolved
					</Button>
					<Button
						type="submit"
						id={'btnQ' + ticket.id}
						onClick={event => updateTicket(ticket.ticketsid, 'queue', event)}
					>
						Send to Queue
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
		if (values.statusesid === 1) {
			let statusText = 'queue';
		} else if (values.statusesid === 2) {
			let statusText = 'resolved';
		} else {
			let statusText = 'in progress';
		}
		axios
			.get('https://devdesk2eli.herokuapp.com/api/users?email=' + values.email, values, config)
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
