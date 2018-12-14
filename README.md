# React-Diary

Just a simple React-Redux-Firebase app with user authentication, user privileges, and full CRUD-ability.

## Setting up firebase

This app requires a file in the src directory called 'firebase.js'.
This file stores all of your firebase data so that you, and other users, can read and write. It looks something like this:

`
import \* as firebase from 'firebase';

let config = {
apiKey: "YOUR_FIREBASE_API_KEY",
authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
databaseURL: "https://YOUR_FIREBASE_PROJECT_ID.firebaseio.com",
projectId: "YOUR_FIREBASE_PROJECT_ID.",
storageBucket: "YOUR_FIREBASE_PROJECT_ID..appspot.com",
messagingSenderId: "YOUR_MESSAGE_SENDER_ID"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
`

These settings can be found in your firebase console. Set up your database, then under project overview hit the </> button. A popup will appear with your credentials.

## Setting upt he Sign-in methods in your firebase database

In order allow users to sign-up and sign-in, you must set up authentication and set your Sign-in Providers. Google this! For example, for Facebook user authentication you need to go to [Facebook for Developers](https://developers.facebook.com) and create a new app. This will take an app secret from you firebase database as well as an OAuth handler.

Google sign-in is more straightforward to implement because Firebase is a Google service. It's simply a case of enabling it within Firebase.

## Run the app

Look in the package.json! (yarn install and then yarn start) :)
