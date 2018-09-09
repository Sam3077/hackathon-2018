"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require('node-mailer');
const serviceAccount = require("../private/serviceAccount.json");
const emailAccount = require("../private/emailAccount.json");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://groupsplit-2c2b5.firebaseio.com",
    projectId: "groupsplit-2c2b5",
});
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
exports.setupAccount = functions.auth.user().onCreate(user => {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName && user.displayName != '' ? user.displayName : user.email,
        image: user.photoURL || ''
    });
});
exports.createNewGroup = functions.https.onRequest((request, response) => {
    const params = JSON.parse(request.body);
    const token = params.token;
    const name = params.name;
    const image = params.image;
    const members = params.members;
    console.log(token);
    console.log(name);
    console.log(members);
    admin.auth().verifyIdToken(token, true).then(verifiedToken => {
        db.collection("groups").add({
            displayName: name,
            members: members,
            image: image
        }).then(ref => {
            db.collection("users").doc(verifiedToken.uid).get().then(doc => {
                const data = doc.data();
                if (data) {
                    db.collection("users").doc(verifiedToken.uid).collection("groups").doc(ref.id).set({
                        displayName: name,
                        members: [data.displayName],
                        image
                    });
                }
            });
            members.forEach(member => {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: emailAccount
                });
                let mailOptions = {
                    from: '"GroupSplit" <groupsplit255@gmail.com>',
                    to: member,
                    subject: 'You have been added to a GroupSplit!',
                    html: '<p>Please follow this <a href="localhost:3000/' + ref + '">link</a> to join ' + name + ' on GroupSplit!</p>'
                };
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
            });
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.status(204).send();
        }).catch(() => response.status(500).send());
    }).catch(() => response.status(500).send());
});
//# sourceMappingURL=index.js.map