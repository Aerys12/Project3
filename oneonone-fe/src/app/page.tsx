"use client";

import Link from "next/link";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Home() {
	return (
		<div className='customer-container'>
			<section className='hero custom-full-width bg-primary-subtle'>
				<div className='text-center'>
					<h1 className='display-3'>
						Choose a time. Choose a person. Schedule it in your calendar.
					</h1>
					<p className='lead'>
						Schedule appointments, meetings and 1on1s quickly with 1on1
					</p>
					<div>
						<a href='/signup.html' className='btn btn-primary'>
							Sign up <i className='bi bi-arrow-right'></i>
						</a>
					</div>
				</div>
			</section>

			<section className='custom-full-width py-5'>
				<div className='container'>
					<div className='row align-items-center justify-content-center mx-sm-5'>
						<h1 className='display-4 text-center mt-5'>
							Scheduling solutions tailored for entrepreneurs, freelancers, and
							leaders.
						</h1>
						<p className='lead text-center mb-sm-5'>
							1on1's made for teams of all sizes
						</p>
						<div className='row px-0 justify-content-center text-center gap-4'>
							<div className='col-lg-3'>
								<div className='card h-100 border-primary'>
									<div className='card-header bg-primary text-white'>
										<i className='bi bi-person-workspace h2 text-bg-primary p-1'></i>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Individuals</h5>
										<p className='card-text'>
											Maintain your calendars in sync and schedule meetings with
											clients and teammates more swiftly.
										</p>
										<Link
											href='/register'
											className='btn btn-outline-primary mb-3'
										>
											Sign Up
										</Link>
									</div>
								</div>
							</div>
							<div className='col-lg-3'>
								<div className='card h-100 border-primary'>
									<div className='card-header bg-primary text-white'>
										<i className='bi bi-person-plus h2 text-bg-primary p-1'></i>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Teams</h5>
										<p className='card-text'>
											Include teammates in invitations and booking pages, and
											utilize shared calendars for coordination.
										</p>
										<a
											href='/register'
											className='btn btn-outline-primary mb-3'
										>
											Sign Up
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3'>
								<div className='card h-100 border-primary'>
									<div className='card-header bg-primary text-white'>
										<i className='bi bi-building h2 text-bg-primary p-1'></i>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Enterprise</h5>
										<p className='card-text'>
											Securely oversee the scheduling requirements of your
											entire organization.
										</p>
										<a
											href='/register'
											className='btn btn-outline-primary mb-3'
										>
											Sign Up
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='custom-full-width'>
				<div className='container-custom text-center mt-5'>
					<h1 className='display-4'>
						Simplify the process of arranging meetings
					</h1>
					<p className='lead'>
						1on1 simplifies the process of scheduling by eliminating the need
						for constant back-and-forth to find a suitable meeting time. This
						leads to more efficient and productive meetings.
					</p>
				</div>
				<div className='custom-scroller'>
					<div className='scroller__inner'>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-send h2 text-bg-primary p-1'></i>
								</h5>
								<h5 className='card-subtitle mb-2 text-body-secondary'>
									Send anyone a 1on1 link
								</h5>
								<p className='card-text'>
									Effortlessly schedule one-on-one meetings without requiring
									the other person to signup. Simply create the meeting and send
									it to your meeting partner.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-envelope h2 text-bg-primary p-1'></i>
								</h5>
								<h5 className='card-subtitle mb-2 text-body-secondary'>
									Find a suitable time
								</h5>
								<p className='card-text'>
									Link your calendar to 1on1 to directly view your availability
									within the platform.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-pencil-square h2 text-bg-primary p-1'></i>
								</h5>
								<h5 className='card-subtitle mb-2 text-body-secondary'>
									Include the specifics
								</h5>
								<p className='card-text'>
									Prepare your attendees for each meeting by providing an
									agenda, location details, and more.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-check-square h2 text-bg-primary p-1'></i>
								</h5>
								<h5 className='card-subtitle mb-2 text-body-secondary'>
									Book it
								</h5>
								<p className='card-text'>
									1on1 automatically sends calendar invitations to anyone who
									replies with an email.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='custom-full-width bg-primary py-5'>
				<div>
					<h1 className='display-4 text-center text-white'>
						Designed to integrate seamlessly with your existing tools for
						enhanced collaboration.
					</h1>
					<p className='lead text-center text-white-50'>
						1on1 seamlessly connects with your preferred applications.
					</p>
				</div>
				<div className='row mx-0 gap-4 justify-content-center'>
					<div
						className='card col-4 border-primary-subtle'
						style={{ width: "20rem" }}
					>
						<div className='card-body'>
							<h5 className='card-title mb-3'>
								<i className='bi bi-camera-video h2 text-primary-emphasis p-1'></i>
							</h5>
							<h4 className='card-subtitle mb-2 text-body-secondary'>Zoom</h4>
							<p className='card-text'>
								Effortlessly incorporate Zoom video links into virtual meetings
								arranged via 1on1.
							</p>
						</div>
					</div>
					<div
						className='card col-4 border-primary-subtle'
						style={{ width: "20rem" }}
					>
						<div className='card-body'>
							<h5 className='card-title mb-3'>
								<i className='bi bi-microsoft h2 text-primary-emphasis p-1'></i>
							</h5>
							<h4 className='card-subtitle mb-2 text-body-secondary'>
								Microsoft Teams
							</h4>
							<p className='card-text'>
								Automatically create conferencing links to simplify the process
								of scheduling meetings.
							</p>
						</div>
					</div>
					<div
						className='card col-4 border-primary-subtle'
						style={{ width: "20rem" }}
					>
						<div className='card-body'>
							<h5 className='card-title mb-3'>
								<i className='bi bi-google h2 text-primary-emphasis p-1'></i>
							</h5>
							<h4 className='card-subtitle mb-2 text-body-secondary'>
								Google Calendar
							</h4>
							<p className='card-text'>
								Gain a clear perspective of your daily schedule and ensure all
								your events are synchronized automatically.
							</p>
						</div>
					</div>
					<div
						className='card col-4 border-primary-subtle'
						style={{ width: "20rem" }}
					>
						<div className='card-body'>
							<h5 className='card-title mb-3'>
								<i className='bi bi-apple h2 text-primary-emphasis p-1'></i>
							</h5>
							<h4 className='card-subtitle mb-2 text-body-secondary'>
								Apple Calendar
							</h4>
							<p className='card-text'>
								Gain a clear overview of your daily schedule and automatically
								synchronize all your events.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='custom-full-width'>
				<div className='container-custom text-center'>
					<h1 className='display-4 mt-5'>
						The quickest method for scheduling work meetings
					</h1>
					<p className='lead'>
						Group polls enable you to offer a range of times to people and
						determine the most suitable one for your event.
					</p>
				</div>
				<div className='custom-scroller'>
					<div className='scroller__inner'>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-send h2 text-bg-primary p-1'></i>
								</h5>
								<h4 className='card-subtitle mb-2 text-body-secondary'>
									Invite anyone
								</h4>
								<p className='card-text'>
									Group polls are standalone. Simply send one, and anyone can
									participate, regardless of whether they have an account or
									not.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-envelope h2 text-bg-primary p-1'></i>
								</h5>
								<h4 className='card-subtitle mb-2 text-body-secondary'>
									Monitor who has replied
								</h4>
								<p className='card-text'>
									View the summary instantly. If people haven't responded,
									you'll notice it immediately.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-check-square h2 text-bg-primary p-1'></i>
								</h5>
								<h4 className='card-subtitle mb-2 text-body-secondary'>
									Book it
								</h4>
								<p className='card-text'>
									1on1 automatically issues calendar invitations to anyone who
									responds with their email.
								</p>
							</div>
						</div>
						<div className='card border-primary' style={{ width: "20rem" }}>
							<div className='card-body'>
								<h5 className='card-title mb-3'>
									<i className='bi bi-pencil-square h2 text-bg-primary p-1'></i>
								</h5>
								<h4 className='card-subtitle mb-2 text-body-secondary'>
									Include specifics
								</h4>
								<p className='card-text'>
									Equip your attendees for each meeting by providing details
									like the agenda, location, and additional information.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='custom-full-width'>
				<div className='text-center'>
					<h1 className='display-5'>Scheduling can be done in a simpler way</h1>
					<p className='lead'>
						Streamline the scheduling process to concentrate on collaboration.
					</p>
					<div>
						<Link href='/register' className='btn btn-primary'>
							Try it now <i className='bi bi-arrow-right'></i>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
