"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { subscriptionApp } from "../firebaseConfig";
import { createPost } from "../utils/createPost";

const db = getFirestore(subscriptionApp);

function GetPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");

    // Listen for collection changes
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => doc.data());
      setData(documents);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const addData = async () => {
    await addDoc(collection(db, "posts"), {
      author: "hello world",
      content: "from local",
    });
  };

  return (
    <div>
      {data.map((doc, index) => (
        <p key={index}>
          Data: {doc.author} {doc.content}
        </p>
      ))}
      <button onClick={() => createPost('user2', 'hello world')}>Add Data</button>
    </div>
  );
}

export default GetPosts;