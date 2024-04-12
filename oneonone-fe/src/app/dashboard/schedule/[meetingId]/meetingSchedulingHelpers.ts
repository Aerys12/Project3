const BASE_URL = "http://127.0.0.1:8000";

export const fetchMeetingData = async (meetingId: string, calendarId: string) => {
	
	const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/meetings/${meetingId}/details`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};


export const editMeeting = async (meetingId: string, calendarId: string, data: any) => {
    const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/meetings/${meetingId}/edit/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}

