const getState = ({ getStore, setStore }) => {
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
				let body = {
					full_name: contactInfo.fullName,
					email: contactInfo.email,
					agenda_slug: store.agenda,
					address: contactInfo.address,
					phone: contactInfo.phone
				};
				// fetch("https://assets.breatheco.de/apis/fake/contact/", { not working yet...
				// 	method: "POST",
				// 	body: JSON.parse(body)
				// });
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
