import * as firebasedb from 'firebase';

if (!firebasedb.apps.length) {
    firebasedb.initializeApp({
		apiKey: 'AIzaSyDs4BHqc_m6enr0tZl7M28x2rWZ_oY7Jg4',
		databaseURL: 'https://test-3c452.firebaseio.com/',
	});
}

export default ({app, store}, inject) => {
	app.db = {
		consult: async (collection) => {
			let snapshotResponse = await firebasedb.database().ref(collection).once('value');

			/*firebasedb.database().ref(collection).child('-L5tg6hbJN5Ln_uUrjjQ').on('value', snapshot => {
				console.log('USER', snapshot.val());
			});*/

			return snapshotResponse.val();
		},
		/*login: async (email, password) => {
			await firebasedb.auth().signInWithEmailAndPassword(email, password).catch(err => {
				console.log(err);
			});
		},*/
		auth: firebasedb.auth
		
	}
} 