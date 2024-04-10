"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";

type SelectedDatesListProps = {
	dates: DateRange[];
	setDates: React.Dispatch<React.SetStateAction<DateRange[]>>;
};
interface DateRange {
	start: string;
	end: string;
	preference: number; // Changed from optional string to number
}
interface PreferenceModalProps {
	show: boolean;
	handleClose: () => void;
	handleSave: (dateRange: DateRange) => void;
	dateRange: DateRange;
}

export default function MyCalendar() {
	const router = useRouter();
	const [selectedDates, setSelectedDates] = useState<DateRange[]>([]);
	const [duration, setDuration] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [currentDateRange, setCurrentDateRange] = useState({
		start: "",
		end: "",
	});

	const handleDateSelect = (selectInfo: any) => {
		setCurrentDateRange({ start: selectInfo.startStr, end: selectInfo.endStr });
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleModalSave = (newDateRange: DateRange) => {
		// Check for duplicates
		const isDuplicate = selectedDates.some(
			(dateRange) =>
				dateRange.start === newDateRange.start &&
				dateRange.end === newDateRange.end
		);

		if (!isDuplicate) {
			setSelectedDates([...selectedDates, newDateRange]);
		} else {
			// Handle the duplicate case - maybe alert the user
			alert("This time slot has already been selected.");
		}

		setShowModal(false);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const location = formData.get("location") as string;
		// Assuming this is where the duration is stored

		const availability_calendar = selectedDates.map((dateRange) => ({
			start_time: dateRange.start,
			end_time: dateRange.end,
			preference: dateRange.preference,
		}));

		const meetingData = {
			title,
			description,
			duration,
			location,
			availability_calendar,
		};

		const token = localStorage.getItem("access_token"); // Get the token from local storage

		if (token) {
			try {
				const response = await fetch("http://127.0.0.1:8000/Calendar/add/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Include the token in the request header
					},
					body: JSON.stringify(meetingData),
				});

				if (response.ok) {
					router.push("/dashboard");
				} else {
					// Handle errors
				}
			} catch (error) {
				// Handle network errors
			}
		} else {
			// Handle the case where the token is not available
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className='d-flex flex-column'>
				<h1>Create a new 1:1</h1>

				<label className='form-label' htmlFor='title'>
					Title
				</label>
				<input
					type='text'
					id='title'
					name='title'
					placeholder="What's the occasion?"
					className='form-control'
				/>

				<label className='form-label mt-3' htmlFor='description'>
					Description (optional)
				</label>
				<textarea
					className='form-control'
					id='description'
					name='description'
					placeholder='Here you can include things like an agenda, instructions, or other details'
				></textarea>

				<label className='form-label mt-3' htmlFor='location'>
					Location (optional)
				</label>
				<input
					className='form-control'
					type='text'
					id='location'
					name='location'
					placeholder='Where will this happen?'
				/>

				<select
					className='form-select mt-4'
					id='select-tool'
					name='select-tool'
				>
					<option selected>Select video conferencing tool</option>
					<option value='zoom'>Zoom</option>
					<option value='google-meet'>Google Meet</option>
					<option value='microsoft-teams'>Microsoft Teams</option>
				</select>

				<div className='container mt-4'>
					<h2>Add your times</h2>
					<div className='btn-group my-3' role='group' aria-label='Duration'>
						<button
							type='button'
							className={`btn btn-outline-primary ${
								duration === 15 ? "active" : ""
							}`}
							onClick={() => setDuration(15)}
						>
							15 min
						</button>
						<button
							type='button'
							className={`btn btn-outline-primary ${
								duration === 30 ? "active" : ""
							}`}
							onClick={() => setDuration(30)}
						>
							30 min
						</button>
						<button
							type='button'
							className={`btn btn-outline-primary ${
								duration === 60 ? "active" : ""
							}`}
							onClick={() => setDuration(60)}
						>
							60 min
						</button>
						<button
							type='button'
							className={`btn btn-outline-primary ${
								duration === 1440 ? "active" : ""
							}`}
							onClick={() => setDuration(1440)}
						>
							All day
						</button>
						{/* Implement logic for Custom button if required */}
					</div>

					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						initialView='timeGridWeek'
						selectable={true}
						nowIndicator={true}
						select={handleDateSelect}
						headerToolbar={{
							left: "prev,next",
							center: "title",
							right: "dayGridMonth,timeGridWeek,timeGridDay",
						}}
					/>
					<SelectedDatesList
						dates={selectedDates}
						setDates={setSelectedDates}
					/>
					<PreferenceModal
						show={showModal}
						handleClose={handleModalClose}
						handleSave={handleModalSave}
						dateRange={{ ...currentDateRange, preference: 1 }}
					/>
					<button className='btn btn-primary btn-block mt-2' type='submit'>
						Create Meeting
					</button>
				</div>
			</form>
		</div>
	);
}

function PreferenceModal({
	show,
	handleClose,
	handleSave,
	dateRange,
}: PreferenceModalProps) {
	const [preference, setPreference] = useState(1);

	const onSave = () => {
		handleSave({ ...dateRange, preference });
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Select Preference</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Preference (1-5, 5 being highest):</Form.Label>
						<Form.Control
							as='select'
							value={preference}
							onChange={(e) => setPreference(parseInt(e.target.value))}
						>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={onSave}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function SelectedDatesList({ dates }: SelectedDatesListProps) {
	return (
		<div className='mt-3'>
			<h3 className='h3'>Selected Dates:</h3>
			<div>
				{dates.map((date, index) => (
					<p key={index}>
						{formatDateRange(date.start, date.end)} - Preference:{" "}
						{date.preference}
					</p>
				))}
			</div>
		</div>
	);
}

function formatDateRange(startStr: string, endStr: string): string {
	const startDate = new Date(startStr);
	const endDate = new Date(endStr);
	const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

	const startDateFormatted = startDate.toLocaleString("en-US", dateOptions);
	const startTimeFormatted = startDate.toLocaleString("en-US", timeOptions);
	const endTimeFormatted = endDate.toLocaleString("en-US", timeOptions);

	// Check if the start and end dates are the same
	if (startDate.toDateString() === endDate.toDateString()) {
		return `${startDateFormatted} ${startTimeFormatted} - ${endTimeFormatted}`;
	} else {
		// Include full date for end time if different
		const endDateFormatted = endDate.toLocaleString("en-US", dateOptions);
		return `${startDateFormatted} ${startTimeFormatted} - ${endDateFormatted} ${endTimeFormatted}`;
	}
}
