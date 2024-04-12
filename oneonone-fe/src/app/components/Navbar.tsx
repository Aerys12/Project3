"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthProvider";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function PrimaryNav() {
	const auth = useAuth();
	const logout = auth ? auth.logout : undefined;
	const isLoggedIn = auth ? auth.isLoggedIn : false;
	return (
		<Navbar collapseOnSelect expand='lg' bg='primary-subtle'>
			<Container>
				<Navbar.Brand href='/'>1on1</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					{!isLoggedIn && (
						<Nav className='me-auto'>
							<Nav.Link href='/'>Home</Nav.Link>
							<Nav.Link href='/why'>Why 1on1</Nav.Link>
						</Nav>
					)}
					<Nav className="gap-5">
						<NavDropdown title='Create' id='collapsible-nav-dropdown'>
							<NavDropdown.Item href='/Calendar/add'>1on1</NavDropdown.Item>
							<NavDropdown.Item href='/Calendar/add'>
								Group polls
							</NavDropdown.Item>
						</NavDropdown>
						{isLoggedIn ? (
							<div className='d-flex align-content-center justify-content-between gap-4'>
								<div className='nav-item'>
									<Link href='/profile'>
										<i className='bi bi-person-circle h2 text-primary text-outline-light m-2'></i>
									</Link>
									<Link className="nav-item " href="/dashboard">Dashboard</Link>
								</div>
								<Button onClick={logout}>Logout</Button>
							</div>
						) : (
							<>
								<Nav.Link href='/register'>Register</Nav.Link>
								<Nav.Link eventKey={2} href='/login'>
									Login
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
