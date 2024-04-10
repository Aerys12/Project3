"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardProps {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

const ProfileDashboard = () => {
	const [activeTab, setActiveTab] = useState("profile");
	const changeTab = (tabName: string) => {
		setActiveTab(tabName);
	};
	const [DashboardProps, setProfileData] = useState<DashboardProps>({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
	});
	const router = useRouter();

	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) {
			router.push("/login");
			return;
		}

		const fetchProfileData = async () => {
			try {
				const response = await fetch(
					"http://127.0.0.1:8000/accounts/profile/details/",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch profile data");
				}

				const data = await response.json();
				setProfileData(data);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchProfileData();
	}, [router]);

	if (!DashboardProps) {
		return <div>Loading profile...</div>;
	}

	return (
		<div className='container p-5'>
			<div className='row gap-sm-2'>
				<div
					className='nav flex-column nav-pills border p-3 col'
					id='v-pills-tab'
					role='tablist'
					aria-orientation='vertical'
				>
					<button
						className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
						onClick={() => changeTab("profile")}
						id='v-pills-home-tab'
						data-bs-toggle='pill'
						data-bs-target='#v-pills-home'
						type='button'
						role='tab'
						aria-controls='v-pills-home'
						aria-selected='true'
					>
						Profile
					</button>
					<button
						className={`nav-link ${activeTab === "calendars" ? "active" : ""}`}
						onClick={() => changeTab("calendars")}
						id='v-pills-calendars-tab'
						data-bs-toggle='pill'
						data-bs-target='#v-pills-calendars'
						type='button'
						role='tab'
						aria-controls='v-pills-calendars'
						aria-selected='false'
					>
						Connected Calendars
					</button>
					<button
						className={`nav-link ${activeTab === "contacts" ? "active" : ""}`}
						onClick={() => changeTab("contacts")}
						id='v-pills-contacts-tab'
						data-bs-toggle='pill'
						data-bs-target='#v-pills-contacts'
						type='button'
						role='tab'
						aria-controls='v-pills-contacts'
						aria-selected='false'
					>
						Contacts
					</button>
					<button
						className={`nav-link ${activeTab === "apps" ? "active" : ""}`}
						onClick={() => changeTab("apps")}
						id='v-pills-apps-tab'
						data-bs-toggle='pill'
						data-bs-target='#v-pills-apps'
						type='button'
						role='tab'
						aria-controls='v-pills-apps'
						aria-selected='false'
					>
						Apps and Integrations
					</button>
					<button
						className={`nav-link ${
							activeTab === "notifications" ? "active" : ""
						}`}
						onClick={() => changeTab("notifications")}
						id='v-pills-notifications-tab'
						data-bs-toggle='pill'
						data-bs-target='#v-pills-notifications'
						type='button'
						role='tab'
						aria-controls='v-pills-notifications'
						aria-selected='false'
					>
						Notifications
					</button>
				</div>

				<div className='tab-content border col-sm-9' id='v-pills-tabContent'>
					<div
						className={`tab-pane fade ${
							activeTab === "profile" ? "show active" : ""
						}`}
						id='v-pills-home'
						role='tabpanel'
						aria-labelledby='v-pills-home-tab'
						tabIndex={0}
					>
						<div className='d-flex flex-column'>
							<div className='border-bottom p-3'>
								<h1>Profile</h1>
								<p className='lead'>Manage your profile and preferences</p>
								<h3>General</h3>
							</div>
							<div className='col border-bottom p-3'>
								<h5>Photo</h5>
								<div className='img-div'>
									<img
										className='img-thumbnail'
										src='images/IMG_0446.JPG'
										alt=''
									/>
								</div>
								<form
									action='/upload'
									method='post'
									encType='multipart/form-data'
									className='d-flex flex-column gap-2 mt-5'
								>
									<input
										type='file'
										id='imageUpload'
										name='image'
										accept='image/png, image/jpeg'
									/>
									<div>
										<input
											className='btn btn-primary'
											type='submit'
											value='Upload Image'
										/>
									</div>
								</form>
							</div>
							<div className='border-bottom p-3'>
								<h5>Name</h5>
								<p className='lead'>
									{DashboardProps.first_name} {DashboardProps.last_name}
								</p>
								<button className='btn btn-outline-primary'>Change</button>
							</div>
							<div className='border-bottom p-3'>
								<h5>Calendars</h5>
								<button className='btn btn-primary'>Add Calendar</button>
							</div>
							<div className='border-bottom p-3'>
								<h5>Email</h5>
								<p className='lead'>{DashboardProps.email}</p>
								<a href='change-email.html' className='btn btn-outline-primary'>
									Change
								</a>
							</div>
							<div className='border-bottom p-3'>
								<h5>Password</h5>
								<p className='lead'>**********</p>
								<a
									href='change-password.html'
									className='btn btn-outline-primary'
								>
									Change
								</a>
								<h3>Preferences</h3>
							</div>
							<div className='border-bottom p-3'>
								<button className='btn btn-danger'>Delete account</button>
							</div>
						</div>
					</div>

					<div
						className={`tab-pane fade ${
							activeTab === "calendars" ? "show active" : ""
						}`}
						id='v-pills-calendars'
						role='tabpanel'
						aria-labelledby='v-pills-calendars-tab'
						tabIndex={0}
					>
						<div className='d-flex flex-column'>
							<div className='border-bottom p-3'>
								<h3>Calendars</h3>
								<p className='lead'>
									Automate your scheduling by connecting a calendar, which will
									be utilized to set your booking page availability and manage
									all your scheduled events.
								</p>
								<h5>Connected Calendars</h5>
							</div>
							<div className='border-bottom p-3'>
								<p className='lead'>There are no connnected calendars</p>
								<div>
									<button className='btn btn-primary'>Add Calendar</button>
								</div>
							</div>
							<div className='border-bottom p-3'>
								<h5>Set primary calendar</h5>
								<p className='lead'>
									Which calendar would you like to set as the default for adding
									your bookings?
								</p>

								<form action='submit'>
									<select
										className='form-select'
										aria-label='select primary calendar'
									>
										<option value='1'>aerys.arius@gmail.com</option>
									</select>
								</form>
							</div>
						</div>
					</div>

					<div
						className={`tab-pane fade ${
							activeTab === "contacts" ? "show active" : ""
						}`}
						id='v-pills-contacts'
						role='tabpanel'
						aria-labelledby='v-pills-contacts-tab'
						tabIndex={0}
					>
						<div className='d-flex flex-column'>
							<div className='border-bottom p-3'>
								<h3>Contacts</h3>
								<p className='lead'>
									Conveniently locate and invite your existing contacts for
									meetings arranged through 1on1
								</p>

								<h5>Contacts</h5>
							</div>
							<div className='d-flex flex-column border-bottom p-3'>
								<div className='mb-3'>
									<Link
										className='btn btn-primary'
										href='/profile/contacts/all'
									>
										View Contacts
									</Link>
								</div>

								<h5>Connected Accounts</h5>
							</div>
							<div className='border-bottom p-3'>
								<p className='lead'>You have not connected an account yet</p>
							</div>
							<div className='border-bottom p-3'>
								<Link className='btn btn-primary ' href='/create'>
									Add account
								</Link>
							</div>
						</div>
					</div>

					<div
						className={`tab-pane fade ${
							activeTab === "apps" ? "show active" : ""
						}`}
						id='v-pills-messages'
						role='tabpanel'
						aria-labelledby='v-pills-messages-tab'
						tabIndex={0}
					>
						<div className='d-flex flex-column'>
							<div className='border-bottom p-3'>
								<h3>Apps and Integrations</h3>
								<p className='lead'>
									Connect 1on1 with your favorite apps and tools to automate
									your workflow
								</p>

								<h5>Connected Apps</h5>
							</div>
							<div className='border-bottom p-3'>
								<p className='lead'>You have not connected any apps yet</p>
								<div className='mb-3'>
									<button className='btn btn-primary'>Add App</button>
								</div>
							</div>
						</div>
					</div>

					<div
						className={`tab-pane fade ${
							activeTab === "notifications" ? "show active" : ""
						}`}
						id='v-pills-notifications'
						role='tabpanel'
						aria-labelledby='v-pills-notifications-tab'
						tabIndex={0}
					>
						<div className='d-flex flex-column'>
							<div className='border-bottom p-3'>
								<h3>Notifications</h3>
								<p className='lead'>Manage your notification preferences</p>
							</div>
							<div className='border-bottom p-3'>
								<div className='w-100 d-flex justify-content-between'>
									<h5>Email</h5>
									<form action='submit'>
										<div className='form-check form-switch'>
											<input
												className='form-check-input'
												type='checkbox'
												role='switch'
												id='flexSwitchCheckChecked'
												checked
											/>
										</div>
									</form>
								</div>

								<p className='lead'>
									Emails concerning meetings you've organized or taken part in,
									including those that have been finalized and added to your
									calendar.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='d-flex justify-content-center mt-3'>
					<Link href='/dashboard' className='btn btn-primary'>
						Back to main
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfileDashboard;
