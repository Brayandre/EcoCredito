import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBm4OBzKexUsRRROmoNBRTe7G5AcHewW8A",
  authDomain: "bemviverreact.firebaseapp.com",
  databaseURL: "https://bemviverreact-default-rtdb.firebaseio.com",
  projectId: "bemviverreact",
  storageBucket: "bemviverreact.appspot.com",
  messagingSenderId: "479471217415",
  appId: "1:479471217415:web:383e84d01b3c7268ef73a2",
  measurementId: "G-H2GQLK6DLP"
};

// Evita inicializar mais de uma vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

console.log("Firebase inicializado:", firebase.apps.length);