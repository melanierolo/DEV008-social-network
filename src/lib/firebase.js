// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  onSnapshot,
  Timestamp,
  orderBy,
  query
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrCMjysuSdVhzm0I7MN7kHG3N7OK8aTPw",
  authDomain: "catssociety-20726.firebaseapp.com",
  projectId: "catssociety-20726",
  storageBucket: "catssociety-20726.appspot.com",
  messagingSenderId: "529930489246",
  appId: "1:529930489246:web:e3e117b267cd9c2e675a8f",
  measurementId: "G-RNGW8G8Q3W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

/* ------------------POSTS------------------------- */
// init firebase app

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "posts");
const queryOrdenByDate = query(colRef, orderBy("user_createdAt", "desc"))

// database firestore - collection data
export const queryPosts = async () => getDocs(queryOrdenByDate);

// adding documents
export const addPost = (img, like, name, post, userId) => {
  const postDate = Timestamp.now();
  return addDoc(colRef, {
    user_img: img,
    user_likes: like,
    user_name: name,
    user_post: post,
    user_id: userId,
    user_createdAt: postDate,
  });
};
