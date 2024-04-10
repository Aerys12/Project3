import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrimaryNav from "./components/Navbar";
import { AuthProvider } from "./components/AuthProvider";
import Footer from "./components/Footer";
import "./custom.scss";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CSC309 - One on One",
	description: "Your meetings scheduled with ease",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<PrimaryNav />
					{children}
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
