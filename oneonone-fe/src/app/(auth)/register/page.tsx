"use client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
	validateEmail,
	validatePasswords,
	validatePhone,
	validateUsername,
} from "../../utils/validation/loginValidation";

interface formData {
	username: string;
	email: string;
	phone: string;
	password1: string;
	password2: string;
}

interface formErrors {
	username?: { message: string; valid: boolean };
	email?: { message: string; valid: boolean };
	phone?: { message: string; valid: boolean };
	password1?: { message: string; valid: boolean };
	password2?: { message: string; valid: boolean };
}

interface fieldStyles {
	username?: string;
	email?: string;
	phone?: string;
	password1?: string;
	password2?: string;
}

export default function RegisterPage() {
	const [formData, setFormData] = useState<formData>({
		username: "",
		email: "",
		phone: "",
		password1: "",
		password2: "",
	});
	const [formErrors, setFormErrors] = useState<formErrors>({});
	const [fieldStyles, setFieldStyles] = useState<fieldStyles>({});
	const [submissionError, setSubmissionError] = useState("");

	const handleUsernameChange = (e: any) => {
		const username = e.target.value;
		setFormData({ ...formData, username });
		const validationResult = validateUsername(username);
		setFormErrors({
			...formErrors,
			username: {
				message: validationResult.message,
				valid: validationResult.valid,
			},
		});
		setFieldStyles({
			...fieldStyles,
			username: validationResult.valid ? "" : "bg-danger-subtle",
		});
	};

	const handleEmailChange = (e: any) => {
		const email = e.target.value;
		setFormData({ ...formData, email });
		const validationResult = validateEmail(email);
		setFormErrors({
			...formErrors,
			email: {
				message: validationResult.message,
				valid: validationResult.valid,
			},
		});
		setFieldStyles({
			...fieldStyles,
			email: validationResult.valid ? "" : "bg-danger-subtle",
		});
	};
	const handlePhoneChange = (e: any) => {
		const phone = e.target.value;
		setFormData({ ...formData, phone });
		setFormErrors({ ...formErrors, phone: validatePhone(phone) });
	};
	const handlePasswordChange = (
		passwordFieldName: string,
		passwordValue: string
	) => {
		setFormData({ ...formData, [passwordFieldName]: passwordValue });

		const { password1, password2 } =
			passwordFieldName === "password1"
				? { password1: passwordValue, password2: formData.password2 }
				: { password1: formData.password1, password2: passwordValue };

		const validationResult = validatePasswords(password1, password2);

		setFormErrors({
			...formErrors,
			password1: validationResult.password1,
			password2: validationResult.password2,
		});

		setFieldStyles({
			...fieldStyles,
			password1: validationResult.password1.valid ? "" : "bg-danger-subtle",
			password2: validationResult.password2.valid ? "" : "bg-danger-subtle",
		});
	};

	const handlePassword1Change = (e: any) => {
		handlePasswordChange("password1", e.target.value);
	};
	const handlePassword2Change = (e: any) => {
		handlePasswordChange("password2", e.target.value);
	};
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setSubmissionError("");

		const requestData = {
			username: formData.username,
			email: formData.email,
			phone: formData.phone,
			password1: formData.password1,
			password2: formData.password2,
		};

		try {
			const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Success:", data);
				router.push("/login");
				// Handle success (e.g., show a success message or redirect)
			} else if (response.status === 409) {
				setSubmissionError("Username already exists.");
			} else {
				setSubmissionError("An error occurred. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			console.error("Error:", error);
			setSubmissionError("Network error. Please try again later.");
		}
	};

	return (
		<div className='container-custom p-2 bg-white-50'>
			<h1 className='mt-5 text-center display-4'>1on1</h1>
			<Form
				className='col mt-5 bg-white p-5 border border-2'
				onSubmit={handleSubmit}
			>
				<h1 className='text-primary-emphasis text-center'>
					Let’s retake your calendar, together
				</h1>
				<p className='lead text-center'>
					Organize your schedule more efficiently, assemble the appropriate team
					quickly, and enhance time management at your workplace. That’s 1on1.
				</p>
				<Form.Group className='mb-3'>
					<Form.Label htmlFor='username'>Username:</Form.Label>
					<Form.Control
						type='text'
						id='username'
						onChange={handleUsernameChange}
						className={fieldStyles.username}
					/>
					{formErrors.username && !formErrors.username.valid && (
						<Form.Text className='text-danger'>
							{formErrors.username.message}
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label htmlFor='email'>Email:</Form.Label>
					<Form.Control
						type='text'
						id='email'
						onChange={handleEmailChange}
						className={fieldStyles.email}
					/>
					{formErrors.email && !formErrors.email.valid && (
						<Form.Text className='text-danger'>
							{formErrors.email.message}
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label htmlFor='phone'>Phone:</Form.Label>
					<Form.Control
						type='text'
						id='phone'
						onChange={handlePhoneChange}
						className={fieldStyles.phone}
					/>
					{formErrors.phone && !formErrors.phone.valid && (
						<Form.Text className='text-danger'>
							{formErrors.phone.message}
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label htmlFor='password1'>Password:</Form.Label>
					<Form.Control
						type='password'
						id='password1'
						onChange={handlePassword1Change}
						className={fieldStyles.password1}
					/>
					{formErrors.password1 && !formErrors.password1.valid && (
						<Form.Text className='text-danger'>
							{formErrors.password1.message}
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label htmlFor='password2'>Repeat Password:</Form.Label>
					<Form.Control
						type='password'
						id='password2'
						onChange={handlePassword2Change}
						className={fieldStyles.password2}
					/>
					{formErrors.password2 && !formErrors.password2.valid && (
						<Form.Text className='text-danger'>
							{formErrors.password2.message}
						</Form.Text>
					)}
				</Form.Group>
				{submissionError && (
					<div className='alert alert-danger' role='alert'>
						{submissionError}
					</div>
				)}
				<span>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</span>
				<Form.Text className='notification' id='notification'></Form.Text>
			</Form>
		</div>
	);
}
