export default function ({ store, error, redirect }) {
	if (!store.state.authUser) {
		return redirect('/users/login')
	}
}