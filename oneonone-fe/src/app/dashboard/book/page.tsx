"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchSuggestedData } from "./bookingHelpers";
import { fetchMeetingData } from "./bookingHelpers";
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

export default function Book() {
	const [loading, setLoading] = useState(true);
    const [ suggestions, setSuggestions ] = useState([]);
	const searchParmas = useSearchParams();
	const calendarId = searchParmas.get("calendarId");
	const meetingId = searchParmas.get("meetingId");
    const [meetingData, setMeetingData] = useState<meetingType>();
    useEffect(() => {
		fetchMeetingData(meetingId, calendarId)
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


	useEffect(() => {
		fetchSuggestedData(meetingId, calendarId)
			.then((data) => {
                setSuggestions(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching calendar data:", error);
				setError(error);
				setLoading(false);
			});
	}, []);
	return (
		<div className='container py-5'>
			<div className='row border justify-content-center align-items-center'>
				<div className='col-md-3 p-4'>
					<p>
						<i className='bi bi-person-circle text-primary'></i>
						<b> {meetingData?.calendar.creator}</b>
					</p>
					<h5>{meetingData?.calendar.title}</h5>

					<h6>
						<i className='bi bi-hourglass'></i>{meetingData?.calendar.duration} minutes
					</h6>
					<h6>
						<i className='bi bi-geo-alt'></i>{meetingData?.calendar.location}
					</h6>
				</div>
				<div className='col-md-9 h-100 border border-1 py-2'>
					<h1>Lets confirm your info</h1>
					<p className='lead'>{meetingData?.calendar.title} meeting with {meetingData?.calendar.creator} on</p>
					<h5>{formatDate(suggestions.start_time)}</h5>
					<h5>Canada, Toronto (GMT-5)</h5>
					
					<div className='my-4 d-flex gap-3'>
						<Link href={`\schedule\${meetingData.id}`}>
							<div className='btn btn-dark'>Back</div>
						</Link>
						<Link href='/final'>
							<div className='text-decoration-none btn btn-primary'>
								Book it
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatDate(startStr: string): string {
    const startDate = new Date(startStr);
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    const startDateFormatted = startDate.toLocaleString("en-US", dateOptions);
    const startTimeFormatted = startDate.toLocaleString("en-US", timeOptions);

    return `${startDateFormatted} ${startTimeFormatted}`;
}