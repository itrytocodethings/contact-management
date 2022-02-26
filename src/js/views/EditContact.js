import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
// import { ProgressPlugin } from "webpack";

export const EditContact = props => {
	let currentContact = props.location.state.contact;
	const [contactInfo, setContactInfo] = useState({
		fullName: currentContact.full_name,
		email: currentContact.email,
		phone: currentContact.phone,
		address: currentContact.address
	});
	console.log(contactInfo);
	const { store, actions } = useContext(Context);
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={contactInfo.fullName}
							onChange={e => setContactInfo({ ...contactInfo, fullName: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={contactInfo.email}
							onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={contactInfo.phone}
							onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={contactInfo.address}
							onChange={e => setContactInfo({ ...contactInfo, address: e.target.value })}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							actions.editContact(contactInfo, currentContact.id);
							props.history.goBack();
						}}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object
};
