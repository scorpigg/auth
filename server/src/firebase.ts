import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCLIuAXgvKRgvsyXhWgVhx_ZbNkSJ24Ndo',
  authDomain: 'chat-8d98b.firebaseapp.com',
  databaseURL: 'https://chat-8d98b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chat-8d98b',
  storageBucket: 'chat-8d98b.appspot.com',
  messagingSenderId: '324108720779',
  appId: '1:324108720779:web:463e4bebd9c2779ece528e',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);