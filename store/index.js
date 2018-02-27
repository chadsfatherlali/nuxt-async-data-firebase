import { currentUser } from '../plugins/firebase/firebase-client.js'
import axios from 'axios'

export const state = () => ({
	authUser: null
});

export const mutations = {
	SET_USER: function (state, user) {
		state.authUser = user
	}
}

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		if (
			req.session 
			&& req.session.authUser
			&& req.session.authUser.user
		) {
			commit('SET_USER', req.session.authUser.user)			
		}
	},
	async login ({ commit }, { user }) {
		const { sessionStatus } = await axios.post('/api/setSession', { user })
		commit('SET_USER', user)
	},
	async logout ({ commit }) {
		const { sessionStatus } = await axios.post('/api/destroySession')
		commit('SET_USER', null)
	}
}