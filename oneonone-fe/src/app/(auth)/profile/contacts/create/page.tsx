"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateContact() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const token = localStorage.getItem("access_token");
		if (!token) {
			console.error("No access token found");
			// Redirect to login or handle appropriately
			return;
		}
		console.log(formData);
		try {
			const response = await fetch(
				"http://127.0.0.1:8000/accounts/profile/contacts/create/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error("Something went wrong");
			}

			const data = await response.json();
			// Handle actions post contact creation
			router.push("/dashboard/contacts/all");
		} catch (error) {
			console.error("Error creating contact:", error);
			// Handle error
		}
	};

	return (
		<form className='m-4 col-lg-6' onSubmit={handleSubmit}>
			<div>
				<label className='form-label' htmlFor='name'>
					Name:
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div>
				<label className='form-label' htmlFor='email'>
					Email:
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div>
				<label className='form-label' htmlFor='phone'>
					Phone:
				</label>
				<input
					type='text'
					id='phone'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			{/* Add other input fields as needed */}
			<button className='btn btn-primary mt-3' type='submit'>
				Create Contact
			</button>
		</form>
	);
}
