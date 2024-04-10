"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";

export default function Login() {
	const auth = useAuth();
	const setIsLoggedIn = auth ? auth.setIsLoggedIn : undefined;
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");

	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Login request
		const response = await fetch("http://localhost:8000/accounts/api/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			// Save the token in local storage (or wherever you want to store it)
			localStorage.setItem("access_token", data.access);
			localStorage.setItem("refresh_token", data.refresh);

			if (setIsLoggedIn) {
				setIsLoggedIn(true);
			}

			// After login, redirect to dashboard
			router.push("/dashboard/");
		} else {
			if (response.status === 401) {
				setLoginError("Invalid username or password.");
			} else {
				setLoginError("An error occurred. Please try again.");
			}
			console.error(data);
		}
	};

	return (
		<div className='container main-content'>
			<div className='row justify-content-center'>
				<div className='col-6 border mt-5'>
					<h2 className='text-center mt-5'>Login</h2>
					<form className='m-4 p-5' onSubmit={handleSubmit}>
						<div className='form-outline mb-4'>
							<label className='form-label' htmlFor='username'>
								Username
							</label>
							<input
								type='text'
								id='username'
								className='form-control'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div className='form-outline mb-2'>
							<label className='form-label' htmlFor='user-password'>
								Password
							</label>
							<input
								type='password'
								id='user-password'
								className='form-control'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className='row mb-4'>
							<div className='col'>
								<Link
									href='#!'
									data-bs-toggle='modal'
									data-bs-target='#findPassModal'
								>
									Forgot password?
								</Link>
							</div>
						</div>
						{loginError && (
							<div className='alert alert-danger' role='alert'>
								{loginError}
							</div>
						)}

						<div className='d-grid gap-2'>
							<button type='submit' className='btn btn-primary btn-block mb-4'>
								Login
							</button>
						</div>

						<div className='text-center'>
							<p>
								Not a member? <Link href='/register'>Register</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
