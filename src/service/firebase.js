import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDVZiTA15-dGVx30Bqff2vyh32drAZXa7A",
  authDomain: "lucielma-site.firebaseapp.com",
  projectId: "lucielma-site",
  storageBucket: "lucielma-site.appspot.com",
  messagingSenderId: "1067063585547",
  appId: "1:1067063585547:web:fd9bd1cdbfcb5ff1b6100e",
  databaseURL: "https://lucielma-site-default-rtdb.firebaseio.com/",
  measurementId: "G-MXEB610HJF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
