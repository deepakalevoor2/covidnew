import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  // apiKey: "AIzaSyAXzZhNI8n4oWS6ojEcgW69d0lBe5pCLA4",
  // authDomain: "crwn-db-20f96.firebaseapp.com",
  // databaseURL: "https://crwn-db-20f96.firebaseio.com",
  // projectId: "crwn-db-20f96",
  // storageBucket: "crwn-db-20f96.appspot.com",
  // messagingSenderId: "696076366024",
  // appId: "1:696076366024:web:8704e526960cc3a077b5fd",
  // measurementId: "G-NPT9MQ7KHD",
  apiKey: "AIzaSyD-2u0Ttn4z0cDvBJwbsozlXSLQ0lK5LzE",
  authDomain: "covid-e5585.firebaseapp.com",
  databaseURL: "https://covid-e5585.firebaseio.com",
  projectId: "covid-e5585",
  storageBucket: "covid-e5585.appspot.com",
  messagingSenderId: "1088875804807",
  appId: "1:1088875804807:web:389bf5ff942fb40b876022",
  measurementId: "G-HC2743ZD1P",
};

firebase.initializeApp(config);

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
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getUserCartRef = async (userId) => {
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("carts").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
