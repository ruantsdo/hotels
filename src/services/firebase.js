import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAjLJrGBtSgtvdzDniLLGYkP7xkLYXeMB8",
  authDomain: "hote46c14.firebaseapp.com",
  databaseURL: "https://hote46c14-default-rtdb.firebaseio.com",
  projectId: "hote46c14",
  storageBucket: "hote46c14.appspot.com",
  messagingSenderId: "79423793250",
  appId: "1:79423793250:web:77b88f8716e3bb8f2dc93b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }