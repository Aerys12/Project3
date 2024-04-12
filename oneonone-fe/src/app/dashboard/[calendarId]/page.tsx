"use client";
import { fetchCalendarData } from "./calendarDetailsHelper";
import Link from "next/link";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface CalendarDetailsProps {
	calendar_Id: number;
	title: string;
	description: string;
	location: string;
	availability_calendar: [];
	creator: number;
	meeting: Meeting[];
}

interface Meeting {
	id: number;
	receiver: number;
	receiver_email: string;
	start_time: string;
	status: boolean;
	url: string;
}
export default function CalendarDetails({
	params,
}: {
	params: { calendarId: string };
}) {
	const [data, setCalendarData] = useState<CalendarDetailsProps>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetchCalendarData(params.calendarId)
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
	return (
		<div className='container py-5'>
			<h1 className='text-center mb-4'>Calendar Details {params.calendarId}</h1>
			<div className='row border justify-content-center align-items-center'>
				<div className='col-md-2 p-4'>
					{data && <h5>{data.title}</h5>}
					<h6>
						<i className='bi bi-hourglass'></i> 1 hour
					</h6>
					<h6>
						<i className='bi bi-geo-alt'></i> Bahen Centre
					</h6>
				</div>
				<div className='col-md-10 p-2 border border-1 '>
					<h1 className='text-center '>Pending</h1>
					{data &&
						data.meeting &&
						data.meeting.map((meeting: Meeting) => {
							if (!meeting.status) {
								return (
									<div
										key={meeting.id}
										className='col-6 p-2 d-flex flex-wrap border border-1 border-warning m-2'
									>
										<div className='col-1 align-self-center mx-auto'>
											<i className='h1 bi bi-person-circle text-warning'></i>
										</div>
										<div className='col-11'>
											<h5>Receiver:</h5>
											<p>Email: {meeting.receiver_email}</p>
											<p>Start Time: {meeting.start_time}</p>
											<p>Status: Pending</p>
											<p>URL: {meeting.url}</p>
											<div className='dropdown'>
												<div className='d-grip gap-2'>
													<a
														className='btn btn-warning dropdown-toggle w-75 mx-auto'
														href='#'
														role='button'
														data-bs-toggle='dropdown'
														aria-expanded='false'
													>
														Actions
													</a>

													<ul className='dropdown-menu dropdown-menu-center w-75 bg-warning-subtle text-center'>
														<Link className='dropdown-item' href={"#"}>
															<button className='dropdown-item '>Notify</button>
														</Link>
														<Link className='dropdown-item' href={"#"}>
															<button className='dropdown-item'>Details</button>
														</Link>
														<Link className='dropdown-item' href={"#"}>
															<button className='dropdown-item'>Edit</button>
														</Link>
														<Link className='dropdown-item' href={"#"}>
															<button className='dropdown-item'>Delete</button>
														</Link>
													</ul>
												</div>
											</div>
										</div>
									</div>
								);
							}
						})}
					<h1 className='text-center '>Booked</h1>
					{data &&
						data.meeting &&
						data.meeting.map((meeting: Meeting) => {
							if (!meeting.status) {
								return (
									<div
										key={meeting.id}
										className='row col-6 p-2 d-flex flex-wrap border border-1 border-success m-2'
									>
										<div className='col-1 align-self-center mx-auto'>
											<i className='h1 bi bi-person-circle text-success'></i>
										</div>
										<div className='col-11'>
											<h5>Receiver:</h5>
											<p>Email: {meeting.receiver_email}</p>
											<p>Start Time: {meeting.start_time}</p>
											<p>Status: Booked</p>
											<p>URL: {meeting.url}</p>
											<div className='dropdown'>
												<div className='d-grip gap-2'>
													<a
														className='btn btn-success dropdown-toggle w-75 mx-auto'
														href='#'
														role='button'
														data-bs-toggle='dropdown'
														aria-expanded='false'
													>
														Actions
													</a>

													<ul className='dropdown-menu dropdown-menu-center w-75 bg-success-subtle text-center'>
														<Link className='dropdown-item' href={"#"}>
															<button className='dropdown-item'>Details</button>
														</Link>
													</ul>
												</div>
											</div>
										</div>
									</div>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
}
