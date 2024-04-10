"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
	fetchContacts,
	updateContact,
	deleteContact,
} from "./ContactsHandlers";

interface Contact {
	id: number;
	name: string;
	email: string;
	phone: string;
}

const ContactsPage = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [deleteContactId, setDeleteContactId] = useState<number | null>(null);
	const [editContactData, setEditContactData] = useState<{
		contact: Contact | null;
		id: number | null;
	}>({ contact: null, id: null });

	const handleEditClick = (contact: Contact) => {
		setEditContactData({ contact, id: contact.id });
	};
	const resetEditContactData = () => {
		setEditContactData({ contact: null, id: null });
	};

	useEffect(() => {
		const loadContacts = async () => {
			try {
				const contactsData = await fetchContacts();
				setContacts(contactsData);
			} catch (error) {
				console.error("There was an error fetching contacts!", error);
			}
		};

		loadContacts();
	}, []);

	const handleSaveChanges = async () => {
		if (!editContactData.contact || editContactData.id === null) return;

		try {
			await updateContact(editContactData.id, {
				name: editContactData.contact.name,
				email: editContactData.contact.email,
			});
			// After a successful update, fetch the contacts again
			const updatedContacts = await fetchContacts();
			setContacts(updatedContacts);
			resetEditContactData();
		} catch (error) {
			console.error("Failed to update contact", error);
		}
	};
	// Delete contact
	const handleDeleteContact = async () => {
		if (deleteContactId === null) return;

		try {
			await deleteContact(deleteContactId);
			setContacts((currentContacts) =>
				currentContacts.filter((contact) => contact.id !== deleteContactId)
			);
			setDeleteContactId(null); // Reset the delete contact ID
		} catch (error) {
			console.error("Failed to delete contact", error);
			// Optionally, handle the error in the UI
		}
	};

	return (
		<div>
			<div className='container main-content mt-5'>
				<div className='d-flex align-items-center justify-content-evenly py-2'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text' id='basic-addon1'>
								Search
							</span>
						</div>
						<div className='input-group-ap px-2'>
							<input
								type='text'
								className='form-control'
								id='searchUser'
								placeholder='Enter Username'
							/>
						</div>
					</div>
					<div className=''>
						<Link
							className='btn btn-primary text-center'
							rel='stylesheet'
							href='/dashboard/contacts/create'
						>
							Add
						</Link>
					</div>
				</div>
				<div className='d-flex align-content-start'></div>
				<table className='table table-bordered'>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>Email</th>
							<th scope='col' style={{ width: "110px" }}>
								Manage{" "}
							</th>
						</tr>
					</thead>
					<tbody>
						{contacts.map((contact, index) => (
							<tr key={contact.id}>
								<th scope='row'>{index + 1}</th>
								<td>{contact.name}</td>
								<td>{contact.email}</td>
								<td className='text-center'>
									<button
										type='button'
										className='btn btn-outline-success mx-1'
										data-bs-toggle='modal'
										data-bs-target='#editModal'
										onClick={() => handleEditClick(contact)}
									>
										<i className='bi bi-pencil-square'></i>
									</button>
									<button
										type='button'
										className='btn btn-outline-danger ml-3'
										data-bs-toggle='modal'
										data-bs-target='#deleteModal'
										onClick={() => setDeleteContactId(contact.id)}
									>
										<i className='bi bi-trash'></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='row justify-content-center'>
					<div className='d-flex justify-content-center mt-3'>
						<Link href='/dashboard' className='btn btn-primary'>
							Back to main
						</Link>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='editModal'
				tabIndex={-1}
				aria-labelledby='editModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='editModalLabel'>
								Edit Contact
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							{/* Form fields for editing */}
							<input
								type='text'
								id='edit-name'
								className='form-control mb-2'
								placeholder='Name'
								onChange={(e) => {
									setEditContactData((prev) => ({
										...prev,
										contact: prev.contact
											? { ...prev.contact, name: e.target.value }
											: null,
									}));
								}}
								value={editContactData.contact?.name || ""}
							/>
							<input
								type='email'
								id='edit-email'
								className='form-control'
								placeholder='Email'
								onChange={(e) => {
									setEditContactData((prev) => ({
										...prev,
										contact: prev.contact
											? { ...prev.contact, email: e.target.value }
											: null,
									}));
								}}
								value={editContactData.contact?.email || ""}
							/>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
								onClick={handleSaveChanges}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Delete Modal */}
			<div
				className='modal fade'
				id='deleteModal'
				tabIndex={-1}
				aria-labelledby='deleteModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='deleteModalLabel'>
								Confirm Delete
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							Are you sure you want to delete this contact?
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
								onClick={handleDeleteContact}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;
