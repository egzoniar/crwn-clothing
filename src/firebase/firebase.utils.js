import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCzXabeC-NMnYfxBm1WUeLKioATKFotjT4",
  authDomain: "crwn-db-454e7.firebaseapp.com",
  databaseURL: "https://crwn-db-454e7.firebaseio.com",
  projectId: "crwn-db-454e7",
  storageBucket: "crwn-db-454e7.appspot.com",
  messagingSenderId: "135287109311",
  appId: "1:135287109311:web:7d94a5333cc3d5ad39780a",
  measurementId: "G-VNKG5V5M7D"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('Error creating user', err.message());
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//export default firebase;