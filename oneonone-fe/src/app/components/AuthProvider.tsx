// contexts/AuthContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextValue {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check if the user is logged in (e.g., check if a token exists)
		const token = localStorage.getItem("access_token");
		setIsLoggedIn(!!token);
	}, []);

	const logout = async () => {
		const refreshToken = localStorage.getItem("refresh_token");

		if (refreshToken) {
			try {
				await fetch("http://127.0.0.1:8000/accounts/logout/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ refresh: refreshToken }),
				});
				// Handle the response from the server (success or error)
			} catch (error) {
				// Handle any exceptions during the fetch call
				console.error("Logout error:", error);
			}

			// Proceed to clear the tokens from localStorage whether the server call is successful or not
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
		}

		setIsLoggedIn(false);
		router.push("/login");

		// Optional: Redirect to login page or another page
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
