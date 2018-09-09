import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const serviceAccount = require("../private/serviceAccount.json");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://groupsplit-2c2b5.firebaseio.com"
});
export const setupAccount = functions.auth.user().onCreate(user => {
   const db = admin.firestore();
   return db.collection('users').doc(user.uid).set({
       displayName: user.displayName && user.displayName != '' ? user.displayName : user.email,
       image: user.photoURL || ''
   });
});