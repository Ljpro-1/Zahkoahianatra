import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { 
getDatabase 
} from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyD8tPAbjmh68_JCuwxqdmAz2CPJb6xqcmU",
  authDomain: "ecole-9cc95.firebaseapp.com",
  databaseURL: "https://ecole-9cc95-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecole-9cc95",
  storageBucket: "ecole-9cc95.firebasestorage.app",
  messagingSenderId: "466187797903",
  appId: "1:466187797903:web:23a2a42375a3ed19c5f7fa"
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
