import React from 'react';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBlMBiFV9cdzG5Mg7FfFZ0NO-s-xSj-kY4",
    authDomain: "rn-licenta-2021.firebaseapp.com",
    projectId: "rn-licenta-2021",
    storageBucket: "rn-licenta-2021.appspot.com",
    messagingSenderId: "832647924617",
    appId: "1:832647924617:web:6d4eba62960574155bef58",
    measurementId: "G-T9D4GB90Z8"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
  
   export const database = firebase.firestore();
    // useEffect(()=>{
    //     const unsubscribe = database.collection('overview').onSnapshot(snap => {
    //         const data = snap.docs.map(doc => doc.data())
    //         setDatabaseData(data)
    //       });

    //       //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    //       return () => unsubscribe()
    // },[]);
    // const data = database.collection('overview').doc('func').get().then(doc => {
    //     setDatabaseData(doc.data());
    // });

export default firebase;