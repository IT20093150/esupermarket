const firebaseConfig = {
    apiKey: "AIzaSyB5sm3bFRO1uCYjstY_IyrK9NUKI9I6xpw",
    authDomain: "esupermarket-c9065.firebaseapp.com",
    projectId: "esupermarket-c9065",
    storageBucket: "esupermarket-c9065.appspot.com",
    messagingSenderId: "807730874807",
    appId: "1:807730874807:web:b2488787ef28cb310fc032",
    measurementId: "G-REQ1QBTD08"
  };

firebase.initializeApp(firebaseConfig);


//firestor connection
const firestore = firebase.firestore();