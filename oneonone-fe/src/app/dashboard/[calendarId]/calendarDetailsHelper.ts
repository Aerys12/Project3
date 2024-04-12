const BASE_URL = "http://127.0.0.1:8000";

export const fetchCalendarData = async (calendarId: string) => {
	const data = { calendar_id: calendarId };
	const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/details`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};
