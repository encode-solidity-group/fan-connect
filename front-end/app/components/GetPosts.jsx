import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

// Your firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function GetPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");

    // Listen for collection changes
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const documents = snapshot.docs.map(doc => doc.data());
      setData(documents);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const addData = async () => {
    await addDoc(collection(db, "posts"), {
      author: "hello world",
      content: "from local"
    });
  };

  return (
    <div>
      {data.map((doc, index) => (
        <p key={index}>Data: {doc.author} {doc.content}</p>
      ))}
      <button onClick={addData}>Add Data</button>
    </div>
  );
}

export default GetPosts;
