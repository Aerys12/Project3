"use client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useEffect } from "react";
import {
	fetchCalendarData,
	handleDeleteCalendar,
	shareEmail,
	shareToContacts,
} from "./dashboardUtils";
import { fetchContacts } from "../(auth)/profile/contacts/all/ContactsHandlers";

interface CalendarType {
	id: string;
	title: string;
	location: string;
	meeting: Array<any>;
	availability_calendar: Array<any>;
}
interface Contact {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export default function Dashboard() {
	const [calendarData, setCalendarData] = useState<CalendarType[]>([]);
	const [selectedCalendarId, setSelectedCalendarId] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [contacts, setContacts] = useState<Contact[]>([]);

	const [shareData, setShareData] = useState<{
		receiver: number;
		receiver_email: string;
	} | null>(null);
	const [email, setEmail] = useState("");

	const handleCheckboxChange = (
		contact: { id: number; email: string },
		isChecked: boolean
	) => {
		if (isChecked) {
			setShareData({ receiver: contact.id, receiver_email: contact.email });
		} else {
			setShareData(null);
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleButtonClick = () => {
		if (email && selectedCalendarId) {
			const data = {
                receiver_email: email
              };
              shareEmail(data, selectedCalendarId);
		}
		// If a contact is selected, share the calendar with the contact
		if (shareData && selectedCalendarId) {
			const data = {
				receiver: shareData.receiver,
                receiver_email: shareData.receiver_email,
			};
            shareToContacts(data, selectedCalendarId);
			// Send the data. This could be a fetch or axios call, for example.
		}
	};

	const handleSuccessfulDeletion = (deletedCalendarId: string) => {
		if (calendarData) {
			const updatedCalendarData = calendarData.filter(
				(calendar) => calendar.id !== deletedCalendarId
			);
			setCalendarData(updatedCalendarData);
		}
	};

	useEffect(() => {
		fetchCalendarData()
			.then((data) => {
				setCalendarData(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching calendar data:", error);
				setError(error);
				setLoading(false);
			});
	}, []);

	// Fetch contacts
	useEffect(() => {
		const loadContacts = async () => {
			try {
				const contactsData = await fetchContacts();
				setContacts(contactsData);
			} catch (error) {
				console.error("There was an error fetching contacts!", error);
			}
		};

		loadContacts();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error loading calendar!</div>;
	return (
		<div className='container mt-5 p-4'>
			<h1 className='display-4 text-center text-primary-emphasis'>Calendars</h1>
			<div className='gap-3 row justify-content-center border border-1 py-4'>
				{/* Example of listing meetings */}
				{calendarData &&
					calendarData.map(
						(calendar: {
							id: string;
							title: string;
							location: string;
							meeting: Array<any>;
							availability_calendar: Array<any>;
						}) => (
							<div
								className='col-lg-5 d-flex flex-wrap border border-1'
								key={calendar.id}
							>
								<div className='col-1 align-self-center mx-auto'>
									<i className='h1 bi bi-person-circle text-danger'></i>
								</div>
								<div className='col-10 p-2 d-flex flex-column justify-content-end align-content-end'>
									<h3>{calendar.title}</h3>
									<p className='m-1'>
										<i className='bi bi-calendar3'></i>{" "}
										{calendar.availability_calendar.length}{" "}
										{calendar.availability_calendar.length > 1
											? "options"
											: "option"}
									</p>
									<p className='m-1'>
										<i className='bi bi-people'></i> 1 : 1
									</p>
									<p className='m-1'>
										<i className='bi bi-geo-alt'></i>
										{calendar.location}
									</p>
								</div>
								<div className='col-1 align-self-center'>
									<div className='dropdown'>
										<div className='d-grid gap-2'>
											<a
												className='btn'
												href='#'
												role='button'
												data-bs-toggle='dropdown'
												aria-expanded='false'
											>
												<i className='bi bi-three-dots-vertical'></i>
											</a>
											<ul className='dropdown-menu dropdown-menu-end'>
												<li>
													<button
														data-bs-toggle='modal'
														data-bs-target='#shareMeetingModal'
														className='dropdown-item'
														onClick={() => setSelectedCalendarId(calendar.id)}
													>
														Share
													</button>
												</li>
												<li>
													<a className='dropdown-item' href='editCalender.html'>
														Edit
													</a>
												</li>
												<li>
													<button
														data-bs-toggle='modal'
														data-bs-target='#deleteMeetingModal'
														className='dropdown-item'
														onClick={() => setSelectedCalendarId(calendar.id)}
													>
														Delete
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Loop through meetings and display them */}
								{calendar.meeting.map((meeting) => (
									<div key={meeting.id}>
										<p>Meeting with: {meeting.receiver_email}</p>
										<p>Start time: {meeting.start_time}</p>
										{/* Additional meeting details */}
									</div>
								))}
							</div>
						)
					)}
			</div>
			<div className='row gap-3 justify-content-center border border-1 py-4'>
				<h1 className='display-4 text-primary-emphasis text-center'>Pending</h1>
			</div>
			<div
				className='modal fade'
				id='shareMeetingModal'
				tabIndex={-1}
				aria-labelledby='shareMeetingModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='deleteMeetingModalLabel'>
								Share Link
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<p className='lead'>Share via Email</p>
							<div className='input-group flex-nowrap mt-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Email'
									aria-label='Email'
									aria-describedby='addon-wrapping'
									value={email}
									onChange={handleEmailChange}
								/>
								<button
									className='btn btn-primary'
									id='addon-wrapping'
									onClick={handleButtonClick}
								>
									<i className='bi bi-send'></i>
								</button>
							</div>
							<div className='row p-2'>
								<p className='lead mt-3'>Share with contact</p>
								<table className='table table-bordered'>
									<thead className='thead-dark'>
										<tr>
											<th scope='col'></th>
											<th scope='col'>Name</th>
											<th scope='col'>Email</th>
										</tr>
									</thead>
									{contacts.map((contact, index) => (
										<tbody key={index}>
											<tr>
												<th scope='row'>
													<input
														className='form-check-input'
														type='checkbox'
														id={`checkboxNoLabel${index}`}
														value=''
														aria-label='...'
														onChange={(event) =>
															handleCheckboxChange(
																contact,
																event.target.checked
															)
														}
													/>
												</th>
												<td>{contact.name}</td>
												<td>{contact.email}</td>
											</tr>
										</tbody>
									))}
								</table>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
								onClick={handleButtonClick}
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='deleteMeetingModal'
				tabIndex={-1}
				aria-labelledby='deleteMeetingModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='deleteMeetingModalLabel'>
								Confirm Delete
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							Are you sure you want to delete this Meeting?
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
								onClick={() => {
									if (selectedCalendarId) {
										handleDeleteCalendar(
											selectedCalendarId,
											handleSuccessfulDeletion
										);
									}
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
