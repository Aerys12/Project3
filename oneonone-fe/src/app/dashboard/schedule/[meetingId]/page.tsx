"use client";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { fetchMeetingData } from "./meetingSchedulingHelpers";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { editMeeting } from "./meetingSchedulingHelpers";

type SelectedDatesListProps = {
	dates: DateRange[];
	setDates: React.Dispatch<React.SetStateAction<DateRange[]>>;
};
interface DateRange {
	start_time: string;
	end_time: string;
	preference: number; // Changed from optional string to number
}
interface PreferenceModalProps {
	show: boolean;
	handleClose: () => void;
	handleSave: (dateRange: DateRange) => void;
	dateRange: DateRange;
}
interface CalendarType {
	id: string;
	title: string;
	location: string;
	meeting: Array<meetingType>;
	availability_calendar: Array<any>;
	creator: number;
	duration: number;
}

interface meetingType {
	id: string;
	calendar: CalendarType;
	receiver: Contact;
	receiver_email: string;
	status: boolean;
}

interface Contact {
	id: number;
	contact_full_name: string;
	contact_email: string;
	contact: number;
}

export default function ScheduleMeeting({
	params,
}: {
	params: { meetingId: string };
}) {
	const [meetingData, setMeetingData] = useState<meetingType>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const router = useRouter();
	const searchParmas = useSearchParams();
	const calendarId = searchParmas.get("calendarId");
	const [selectedDates, setSelectedDates] = useState<DateRange[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [currentDateRange, setCurrentDateRange] = useState({
		start: "",
		end: "",
	});

	useEffect(() => {
		fetchMeetingData(params.meetingId, calendarId)
			.then((data) => {
				setMeetingData(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching calendar data:", error);
				setError(error);
				setLoading(false);
			});
	}, []);

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
				dateRange.start_time === newDateRange.start_time &&
				dateRange.end_time === newDateRange.end_time
		);

		if (!isDuplicate) {
			setSelectedDates([...selectedDates, newDateRange]);
		} else {
			// Handle the duplicate case - maybe alert the user
			alert("This time slot has already been selected.");
		}

		setShowModal(false);
	};

	const handleSendAvailabilities = () => {
		// Send selected dates to the server
		try {
			editMeeting(params.meetingId, calendarId!, {
				availability_meeting: selectedDates,
			}).then((data) => {
				console.log("Edit meeting response:", data);
				router.push(`/dashboard/book?calendarId=${calendarId}&meetingId=${params.meetingId}`);
			});
		} catch (error) {
			console.error("Error editing meeting:", error);
			setError(error);
		}
	};

	return (
		<div className='container py-5'>
			<h2 className='text-center mb-4'>Choose a time to book</h2>
			<div className='row border justify-content-center align-items-center'>
				<div className='col-md-3 p-4'>
					<p>
						<i className='bi bi-person-circle text-primary'></i>
						<b> {meetingData?.calendar.creator}</b>
					</p>
					<h5> {meetingData?.calendar.title}</h5>
					<h6>
						<i className='bi bi-hourglass'></i>
						{meetingData?.calendar.duration} minutes
					</h6>
					<h6>
						<i className='bi bi-geo-alt'></i>
						{meetingData?.calendar.location}
					</h6>
				</div>
				<div className='col-md-6 p-md-2'>
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
						dateRange={{
							start_time: currentDateRange.start,
							end_time: currentDateRange.end,
							preference: 1,
						}}
					/>

					<button
						className='btn btn-primary btn-block mt-2'
						onClick={handleSendAvailabilities}
					>
						See suggested times
					</button>
				</div>
				<div className='col-md-3 p-2'>
					<div>
						<h6>
							<i className='bi bi-globe'></i> Canada, Toronto(GMT-5)
						</h6>
						<div className='selected-dates p-3'>
							<h6>Senders Availability</h6>
							<ul className='nav flex-column gap-2 text-center'>
								{meetingData?.calendar.availability_calendar.map(
									(slot, index) => (
										<Link className='dropdown-item' key={index} href='#'>
											<div className='nav-link border text-black'>
												{formatDateRange(slot.start_time, slot.end_time)}
											</div>
										</Link>
									)
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='d-flex justify-content-center mt-3'>
					<Link href='/dashboard'>
						<div className='btn btn-primary'>Back to main</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

function SelectedDatesList({ dates }: SelectedDatesListProps) {
	return (
		<div className='mt-3'>
			<h3 className='h3'>Selected Dates:</h3>
			<div>
				{dates.map((date, index) => (
					<p key={index}>
						{formatDateRange(date.start_time, date.end_time)} - Preference:{" "}
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
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

	const startDateFormatted = startDate.toLocaleString("en-US", dateOptions);
	const startTimeFormatted = startDate.toLocaleString("en-US", timeOptions);
	const endTimeFormatted = endDate.toLocaleString("en-US", timeOptions);

	return `${startDateFormatted} ${startTimeFormatted} - ${endTimeFormatted}`;
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
