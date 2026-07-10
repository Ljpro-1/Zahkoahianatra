import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { 
getDatabase 
} from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


const firebaseConfig = {
   apiKey: "AIzaSyCmOJF_-GER8Q5MRmhXWcfzOhXexCUQrys",
   authDomain: "primairy-61f2f.firebaseapp.com",
   databaseURL: "https://primairy-61f2f-default-rtdb.firebaseio.com",
   projectId: "primairy-61f2f",
   storageBucket: "primairy-61f2f.firebasestorage.app",
   messagingSenderId: "71620877881",
   appId: "1:71620877881:web:9386f616bc8782c1e2f7e8",
   measurementId: "G-294SLT9LQV"
  };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
