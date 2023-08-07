/* eslint-disable arrow-body-style */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  Timestamp,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrCMjysuSdVhzm0I7MN7kHG3N7OK8aTPw',
  authDomain: 'catssociety-20726.firebaseapp.com',
  projectId: 'catssociety-20726',
  storageBucket: 'catssociety-20726.appspot.com',
  messagingSenderId: '529930489246',
  appId: '1:529930489246:web:e3e117b267cd9c2e675a8f',
  measurementId: 'G-RNGW8G8Q3W',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

/* ------------LOGIN-------------*/

export const loginWithEmail = (userEmail, password) => {
  return signInWithEmailAndPassword(auth, userEmail, password);
};

/* ------------REGISTER------------ */

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/* --------Google (login)----- */

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/* --------Google (register)----- */
export const registerWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/* ------------------POSTS------------------------- */
// init firebase app

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'posts');
const queryOrdenByDate = query(colRef, orderBy('user_createdAt', 'desc'));

// database firestore - collection data
export const queryPosts = async () => getDocs(queryOrdenByDate);

// adding documents
export const addPost = (img, name, post, userId) => {
  const postDate = Timestamp.now();
  return addDoc(colRef, {
    user_img: img,
    user_likes: [],
    user_name: name,
    user_post: post,
    user_id: userId,
    user_createdAt: postDate,
  });
};

// Delete document
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// Update document
export const updatePost = (id, newPost) => {
  updateDoc(doc(db, 'posts', id), { user_post: newPost });
};

/* -----------------------Like-------------------- */
// get post
export const getPost = (id) => {
  const postRef = doc(db, 'posts', id);
  return getDoc(postRef);
};

// add like
export const addLike = (postId, userId) => {
  const postRef = doc(db, 'posts', postId);

  return updateDoc(postRef, { user_likes: arrayUnion(userId) });
};

// remove like
export const removeLike = (postId, userId) => {
  const postRef = doc(db, 'posts', postId);

  return updateDoc(postRef, { user_likes: arrayRemove(userId) });
};
