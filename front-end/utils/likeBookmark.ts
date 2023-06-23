import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { SetStateAction } from "react";

export const handleLike = async (post: DocumentData, userAddress: string | undefined) => {
  const postRef = doc(db, "posts", post.id);
  if (!userLikedPost(post, userAddress)) {
    await updateDoc(postRef, {
      liked: arrayUnion(userAddress),
    });
  } else {
    await updateDoc(postRef, {
      liked: arrayRemove(userAddress),
    });
  }
};

export const userLikedPost = (post: DocumentData, userAddress: string | undefined) => {
  return post.liked !== undefined ? post.liked.includes(userAddress) : false;
};

export const userBookmarkedPost = (
  postId: string,
  bookmarkedPosts: string[]
) => {
  return bookmarkedPosts.includes(postId);
};

export const handleBookmark = async (
  post: DocumentData,
  userAddress: string | undefined,
  setBookmarkedPosts: React.Dispatch<SetStateAction<string[]>>,
  bookmarkedPosts: string[]
) => {
  const userRef = doc(db, "users", userAddress);
  if (!userBookmarkedPost(post.id, bookmarkedPosts)) {
    await updateDoc(userRef, {
      bookmark: arrayUnion(post.id),
    });
    setBookmarkedPosts((prev) => [...prev, post.id]); // Update local state
  } else {
    await updateDoc(userRef, {
      bookmark: arrayRemove(post.id),
    });
    setBookmarkedPosts((prev) => prev.filter((id) => id !== post.id)); // Update local state
  }
};
