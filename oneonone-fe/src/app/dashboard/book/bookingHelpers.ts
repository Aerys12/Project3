const BASE_URL = "http://127.0.0.1:8000";

export const fetchSuggestedData = async (meetingId: string, calendarId: string) => {
    
    const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/meetings/${meetingId}/suggest-time`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};



export const fetchMeetingData = async (meetingId: string, calendarId: string) => {
	
	const response = await fetch(`${BASE_URL}/Calendar/${calendarId}/meetings/${meetingId}/details`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};