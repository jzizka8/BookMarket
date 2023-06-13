import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7Tko8JEQAZFc1x_p-NATtTncNTsnTCMs',
  authDomain: 'pb138-book-market.firebaseapp.com',
  projectId: 'pb138-book-market',
  storageBucket: 'pb138-book-market.appspot.com',
  messagingSenderId: '823392342744',
  appId: '1:823392342744:web:2ce280749ab659eac63dad',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
