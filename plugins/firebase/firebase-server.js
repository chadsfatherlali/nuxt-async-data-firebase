const firebaseAdmin = require('firebase-admin')
const serviceAccount = require('./test-f4fec7a1f311.json')
const firebaseConst = require('./firebase-const')

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	databaseURL: firebaseConst.urlDatabase
});

module.exports = {
	consult: async function (collection) {
		let snapshot = await firebaseAdmin.database().ref(collection).once('value');

		return snapshot.val();
	}	
}