import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainLoad from './MainLoad.js';
import setSearchResults from './SearchForm.js';
import setSearchResultsH from './SearchFormH.js';
import setSearchResultsQ from './SearchFormQ.js';

const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 0 1em;
	padding: 1em 2em;
`;

const LoginFormatting = styled.form`
	display: flex;
	color: #4c5962;
	font-weight: bold;
	margin: 1em;
	justify-content: center;
	align-items: center;
	width: 95%;
`;
const Div = styled.div`
	padding: 1em;
	display: flex;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;
`;

const H1 = styled.h1`
	color: #383651;
	font-size: 1rem;
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
const ButtonRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	justify-content: space-evenly;
	margin: 0;
	padding: 2%;
`;

const fieldLength = {
	width: '97%',
	margin: '0',
	padding: '0'
};
// supposed to go in UserForm parameters ", status"
const UserForm = ({ values, errors, touched, isSubmitting, status }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [lVisible, setLVisible] = useState(true);
	const [currentUsertype, setCurrentUsertype] = useState('student');
	const [currentUserID, setCurrentUserID] = useState('student');
	const [ticketURL, setTicketURL] = useState('');
	const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());
	const [tickets, setTickets] = useState([]);
	const [ticketsH, setTicketsH] = useState([]);
	const [ticketsQ, setTicketsQ] = useState([]);
	const [profile, setProfile] = useState([]);
	const [helpers, setHelpers] = useState([]);

	useEffect(
		props => {
			if (status != null) {
				// get usertype/id of logging-in user
				let config = {
					headers: {
						authorization: localStorage.getItem('token'),
						'Content-Type': 'application/json'
					}
				};
				axios
					.get('https://devdesk2eli.herokuapp.com/api/users/helpers', config)
					.then(res => {
						setHelpers(res.data);
						console.log('helpers = ' + res.data);
						console.log('status = ' + status);
						for (let x = 0; x < res.data.length; x++) {
							if (status.name === res.data[x].name) {
								status = {
									...status,
									usertype: 'helper'
								};
								setCurrentUsertype('helper');
								url = `https://devdesk2eli.herokuapp.com/api/tickets/queue`;
								axios
									.get(url, config)
									.then(res => {
										console.log('ticket queue = ' + res.data);
										setTicketsQ(res.data);
										console.log('usersid = ' + status.usersid);
									})
									.catch(err => {
										console.log(err);
									});
								setTicketURL(`https://devdesk2eli.herokuapp.com/api/tickets/helpers/${status.usersid}`);
								url = `https://devdesk2eli.herokuapp.com/api/tickets/helpers/${status.usersid}`;

								axios
									.get(url, config)
									.then(res => {
										setTicketsH(res.data);
										console.log('usersid = ' + status.usersid);
										console.log('helper tickets = ' + res.data);
									})
									.catch(err => {
										console.log(err);
									});
								break;
							}
						}
					})
					.catch(err => {
						console.log(err);
					});
				console.log('usertype = ' + currentUsertype);
				setCurrentUserID(`${status.usersid}`);
				setProfile({
					usersid: status.usersid,
					name: status.name,
					email: status.email,
					password: status.password
				});
				let url;
				if (currentUsertype === 'helper') {
				} else {
					setTicketURL(`https://devdesk2eli.herokuapp.com/api/tickets/students/${status.usersid}`);
				}
				url = `https://devdesk2eli.herokuapp.com/api/tickets/students/${status.usersid}`;

				console.log('status.usersid = ' + status.usersid);
				setLoggedIn(!loggedIn);

				axios
					.get(url, config)
					.then(res => {
						setTickets(res.data);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		[status, tickets, currentDate, ticketsQ, loggedIn]
	);

	function toggleLVisible() {
		setLVisible(!lVisible);
	}

	if (window.location.pathname === '/signup') {
		return null;
	} else if (loggedIn === true) {
		return (
			<MainLoad
				currentUsertype={currentUsertype}
				ticketURL={ticketURL}
				tickets={tickets}
				ticketsQ={ticketsQ}
				ticketsH={ticketsH}
				profile={profile}
				searchResults={tickets}
				searchResultsH={ticketsH}
				searchResultsQ={ticketsQ}
				setSearchResults={setSearchResults}
				setSearchResultsH={setSearchResultsH}
				setSearchResultsQ={setSearchResultsQ}
			/>
		);
	} else {
		return (
			<Div>
				<H1>Login or Register for an account to view and submit tickets:</H1>
				<LoginFormatting>
					<Form>
						{touched.email && errors.email && <p>{errors.email}</p>}
						{touched.password && errors.password && <p>{errors.password}</p>}
						<FormField>
							<Label>Email:</Label>
							<SCField>
								<Field
									type="email"
									name="email"
									placeholder="Email"
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
						<ButtonRow>
							<Button type="submit">Log In</Button>
							<Link to="/signup">
								<Button type="submit" onClick={toggleLVisible}>
									Register
								</Button>
							</Link>
						</ButtonRow>
					</Form>
				</LoginFormatting>
			</Div>
		);
	}
};
let FormikForm;

if (UserForm.loggedIn === true) {
	FormikForm = () => {
		return <MainLoad />;
	};
} else {
	FormikForm = withFormik({
		mapPropsToValues({ email, password }) {
			return {
				email: email || '',
				password: password || ''
			};
		},
		// validation schema
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('Email not valid')
				.required('Email is required'),
			password: Yup.string()
				.min(6, 'Password must be 6 characters or longer')
				.required('Password is required')
		}),

		handleSubmit(values, { status, setStatus, resetForm, setErrors, setSubmitting }) {
			let url = `https://devdesk2eli.herokuapp.com/api/login`;
			axios
				.post(url, values)
				.then(res => {
					localStorage.setItem('token', res.data.token);
					console.log('res.data = ' + res.data.usersid);
					setStatus(res.data);
					resetForm();
					setSubmitting(false);
				})
				.catch(err => {
					console.log(err);
					setSubmitting(false);
				});
		}
	})(UserForm);
}

export default FormikForm;
