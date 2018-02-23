/*export const state = () => ({
	authUser: null
});

export const mutations = {
	SET_USER: function (state, user) {
		state.authUser = user;
	}
}

export const actions = {
	nuxtServerInit({ app, commit }) {
		let user = app.db.auth().currentUser;

		if (!user) commit('SET_USER', user);
	},
	async login ({ app, commit }, { error }) {
		if (!error) commit('SET_USER', app.db.auth().currentUser);
	}
}*/