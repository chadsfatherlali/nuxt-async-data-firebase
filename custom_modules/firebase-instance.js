import * as firebasedb from 'firebase';

if (!firebasedb.apps.length) {
    firebasedb.initializeApp({
		apiKey: 'AIzaSyDs4BHqc_m6enr0tZl7M28x2rWZ_oY7Jg4',
		databaseURL: 'https://test-3c452.firebaseio.com/',
	});
}

const consult = async (collection) => {
	let snapshot = await firebasedb.database().ref(collection).once('value');

	return snapshot.val();
}

export { firebasedb, consult };