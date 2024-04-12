"use client";
import { useState } from "react";
import { fetchUsersByEmail, createContact } from "./createContactHandlers";
import { useRouter } from "next/navigation";

interface User {
	id: number;
	username: string;
	name: string;
	email: string;
}

export default function CreateContacts() {
	const [searchResults, setSearchResults] = useState<User[]>([]);

	// This function is what you pass down to SearchUsers
	const handleResultSelect = (results: User[]) => {
		setSearchResults(results); // Update the state with the new search results
	};

	return (
		<div className='container mt-5'>
			<div className='row border border-1 mx-auto justify-content-center' >
				<SearchUsers onResultSelect={handleResultSelect} />
				<UsersList users={searchResults} />
			</div>
		</div>
	);
}

function SearchUsers({
	onResultSelect,
}: {
	onResultSelect: (results: any) => void;
}) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleSearch = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			const results = await fetchUsersByEmail(email);
			onResultSelect(results);
			setEmail("");
		} catch (error) {
			setError((error as Error).message);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=''>
			<div className='d-flex w-50 justify-content-center align-items-center'>
				<input
					type='email'
					value={email}
					onChange={handleInputChange} // Change to onChange for proper input handling
					placeholder='Search by email'
					className='form-control'
					onKeyDown={(e) => e.key === "Enter" && handleSearch(e as any)}
				/>
				<button
					className='btn btn-primary'
					onClick={handleSearch}
					disabled={loading}
				>
					{loading ? "Searching..." : "Search"}
				</button>
				{error && <p>{error}</p>}
			</div>
		</div>
	);
}

function UsersList({ users }: { users: User[] }) {
	const router = useRouter();
	const [error, setError] = useState("");
	const handleAddContact = async (username: string) => {
		try {
			const result = await createContact(username);
			router.push("/profile/contacts/all");
		} catch (error) {
			setError((error as Error).message);
		}
	};

	return (
		<div className='row mt-3'>
			{users.map((user) => (
				<div className='d-flex align-content-center gap-3'>
					<p className='lead' key={user.id}>
						{user.name} - {user.email}
					</p>
					<button
						className='btn btn-primary'
						onClick={() => handleAddContact(user.username)}
					>
						Add
					</button>
					{error && <p>{error}</p>}
				</div>
			))}
		</div>
	);
}
