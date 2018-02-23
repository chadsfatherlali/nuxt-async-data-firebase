export default function ({ app, store, error }) {
	const user = app.db.auth().currentUser;

	console.log(user);
}