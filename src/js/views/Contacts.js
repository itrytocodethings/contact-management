import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		contactToDelete: null
	});

	useEffect(() => actions.getContacts());

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{/* <ContactCard onDelete={() => setState({ showModal: true })} /> */}
						{store.contacts.map((contact, i) => {
							return (
								<ContactCard
									key={i}
									contact={contact}
									onDelete={() => {
										setState({
											showModal: true,
											contactToDelete: contact.id
										});
									}}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() =>
					setState({
						showModal: false,
						contactToDelete: null
					})
				}
				deleteContact={() => {
					actions.deleteContact(state.contactToDelete);
					setState({ showModal: false, contactToDelete: null });
				}}
			/>
		</div>
	);
};
