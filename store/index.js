import { currentUser } from '../custom_modules/firebase-instance.js'
import axios from 'axios'

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
		if (req.session && req.session.authUser) {
			commit('SET_USER', req.session.authUser);			
		}
	},
	async login ({ app, commit }, { user }) {
		const { savedSession } = await axios.post('/api/setSession', { user })
		commit('SET_USER', user);
	},
	async logout ({ commit }) {
		const { destroyedSession } = await axios.post('/api/destroyedSession')
	}
}