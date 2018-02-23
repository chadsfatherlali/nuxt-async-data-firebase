import { currentUser } from '../custom_modules/firebase-instance.js'

export const state = () => ({
	authUser: null
});

export const mutations = {
	SET_USER: function (state, user) {
		state.authUser = user;
	}
}

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		commit('SET_USER', currentUser());
	},
	async login ({ app, commit }, { user }) {
		commit('SET_USER', user);
	}
}