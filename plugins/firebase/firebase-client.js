import * as firebasedb from 'firebase'
import { urlDatabase, apiKey } from './firebase-const'

if (!firebasedb.apps.length) {
    firebasedb.initializeApp({
		apiKey: apiKey,
		databaseURL: urlDatabase
	})
}

/**
 * Obtenemos el usuario actualmente logado
 */
const currentUser = () => {
	return firebasedb.auth().currentUser
}

/**
 * Hacemos un login contra firebase
 */
const login = async (email, password) => {
	let loginStatus = await firebasedb.auth().signInWithEmailAndPassword(email, password).catch(err => {
		return {
			error: true,
			data: err
		}
	})

	return loginStatus
}

const logout = async () => {
	let logoutStatus = await firebasedb.auth().signOut().catch(err => {
		return err
	})

	return logoutStatus
}

/**
 * Función para hacer consultas a una coleccion
 */
const consult = async (collection) => {
	let snapshot = await firebasedb.database().ref(collection).once('value')

	return snapshot.val()
}

export { firebasedb, consult, login, logout, currentUser, userIdToken }
