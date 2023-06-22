import { doc, collection, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useBookmarkedPosts(userAddress: string | undefined) {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      if (userAddress) {
        const userRef = doc(collection(db, "users"), userAddress);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setBookmarkedPosts(userData?.bookmark || []);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchBookmarkedPosts();
  }, [userAddress]);

  return { bookmarkedPosts, setBookmarkedPosts };
}
