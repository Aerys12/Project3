import exp from "constants";


const BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("access_token");

export async function fetchUsersByEmail(email: string) {
	const userToken = localStorage.getItem("access_token");
	const response = await fetch(
		`${BASE_URL}/accounts/profile/contacts/search?email=${email}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${userToken}`,
				"Content-Type": "application/json",
			},
		}
	);
	if (response.ok) {
		return await response.json();
	} else {
		console.error("Search failed:", await response.text());
	}
}

export async function createContact(username: string) {
	
	const userToken = localStorage.getItem("access_token");
	const response = await fetch(`${BASE_URL}/accounts/profile/contacts/create/`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${userToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username }),
	});
	if (response.ok) {
		return await response.json();
	} else {
		console.error("Create contact failed:", await response.text());
	}
}
