const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			agenda: "WayneB",
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/WayneB")
					.then(response => {
						if (!response.ok) throw new Error("help");
						return response.json();
					})
					.then(response => {
						response.forEach(contact => (contact.img = "https://i.ibb.co/XYZhxwM/prisonmike.png"));
						setStore({ contacts: response });
					})
					.catch(e => console.log(e));
			},
			addContact: contactInfo => {
				let store = getStore();
				let actions = getActions();

				let body = {
					full_name: contactInfo.fullName,
					email: contactInfo.email,
					agenda_slug: store.agenda,
					address: contactInfo.address,
					phone: contactInfo.phone
				};
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
						// 'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
					.then(response => {
						if (response.ok) actions.getContacts();
					})
					.catch(e => console.log(e, " THE ERROR"));
			},
			deleteContact: contact => {
				let actions = getActions();
				fetch(`https://assets.breatheco.de/apis/fake/contact/${contact}`, {
					method: "DELETE"
				}).then(response => {
					if (response.ok) actions.getContacts();
				});
			},
			editContact: (contactInfo, id) => {
				let store = getStore();
				let actions = getActions();

				let body = {
					full_name: contactInfo.fullName,
					email: contactInfo.email,
					agenda_slug: store.agenda,
					address: contactInfo.address,
					phone: contactInfo.phone
				};
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
						// 'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
					.then(response => {
						if (response.ok) actions.getContacts();
					})
					.catch(e => console.log(e, " THE ERROR"));
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
