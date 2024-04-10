const BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("access_token");

// fetchCalendars function
export const fetchCalendarData = async () => {
	const response = await fetch(`${BASE_URL}/Calendar/all/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};

// calendarUtils.js

export const handleDeleteCalendar = async (calendarId: string, onSuccess) => {
	if (!calendarId) return;

	const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/delete`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.ok) {
		onSuccess(calendarId);
	} else {
	}
};

export const shareEmail = async (
	sharedEmail: { receiver_email: string },
	calendarId: string
) => {
	console.log(sharedEmail);
	const response = await fetch(
		`${BASE_URL}/Calendar/${calendarId}/meetings/add/`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sharedEmail),
		}
	);

	if (response.ok) {
		// Email shared successfully
	} else {
		// Error sharing email
	}
};

export const shareToContacts = async (
	data: { receiver: number; receiver_email: string },
	calendarId: string
) => {
	const response = await fetch(
		`${BASE_URL}/Calendar/${calendarId}/meetings/add/`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);

	if (response.ok) {
		// Shared with contacts successfully
	} else {
		// Error sharing with contacts
	}
};
