import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { DocumentData } from "firebase/firestore";

export const handleLike = async (post:DocumentData, userAddress:string) => {
  const postRef = doc(db, 'posts', post.id);
  if(!userLikedPost(post, userAddress)){
    await updateDoc(postRef, {
      liked: arrayUnion(userAddress),
    }); 
  }else{
    await updateDoc(postRef, {
      liked: arrayRemove(userAddress),
    });
  }
}

export const userLikedPost = (post:DocumentData, userAddress:string) => {
  return (post.liked !== undefined ? post.liked.includes(userAddress) : false);
}

export const userBookmarkedPost = (postId:string, bookmarkedPosts:string[]) => {
  return bookmarkedPosts.includes(postId);
};

export const handleBookmark = async (post:DocumentData, userAddress:string, setBookmarkedPosts:React.Dispatch<React.SetStateAction<string[]>>,bookmarkedPosts:string[]) => {
  const userRef = doc(db, 'users', userAddress);
  if(!userBookmarkedPost(post.id, bookmarkedPosts)){
    await updateDoc(userRef, {
      bookmark: arrayUnion(post.id),
    }); 
    setBookmarkedPosts((prev) => [...prev, post.id]); // Update local state
  }else{
    await updateDoc(userRef, {
      bookmark: arrayRemove(post.id),
    });
    setBookmarkedPosts((prev) => prev.filter((id) => id !== post.id)); // Update local state
  }
}
