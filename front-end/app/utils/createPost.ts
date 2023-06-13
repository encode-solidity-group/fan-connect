import { addDoc, collection, getFirestore } from "firebase/firestore";
import { subscriptionApp } from "../firebaseConfig";

const db = getFirestore(subscriptionApp);

export const createPost = async (author: string, content: string) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      author,
      content,
    });

    console.log('Post created with ID:', docRef.id);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};