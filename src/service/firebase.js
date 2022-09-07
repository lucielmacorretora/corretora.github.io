import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export {auth, app}