import React, {useState, useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider , signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Button from './components/button.js'


const firebaseConfig = {
  apiKey: "AIzaSyBr7OQyfTk1QrsuJCK0k27IM8PP__IKhPY",
  authDomain: "colabroom.firebaseapp.com",
  projectId: "colabroom",
  storageBucket: "colabroom.appspot.com",
  messagingSenderId: "1015571630901",
  appId: "1:1015571630901:web:0400c12b5fe624be79da7c",
  measurementId: "G-LWJ5BM7PFG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {

  const[user,setUser] = useState(() => auth.currentUser);
  const[initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
       } else {
        setUser(null);
       }
       if (initializing){
        setInitializing(false);
       }
    });

    return unsubscribe;

  },[]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    
  };


  const signout = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })
  }


  if (initializing) return "Loading...";

  return(

    <div>
      {user ? (
       <>
        <Button onClick={signout}>Sign Out</Button>
        <Channel user={user} db={db}/>
       </>


        ) : (
          <Button onClick={signInWithGoogle}>Sign in With Google</Button>
        )}     
    </div>
  );

}

export default App;
