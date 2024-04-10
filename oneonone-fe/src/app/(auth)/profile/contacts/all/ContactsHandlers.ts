// contactService.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("access_token");

export const fetchContacts = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/accounts/profile/contacts/all/`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateContact = async (id: number, contactData: {}) => {
	try {
		const response = await axios.patch(
			`${BASE_URL}/accounts/profile/contacts/edit/${id}/`,
			contactData,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Add other contact-related API functions here as needed
// ContactsHandlers.js
export const deleteContact = async (id: number) => {
	try {
		await axios.delete(`${BASE_URL}/accounts/profile/contacts/edit/${id}/`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		throw error;
	}
};
