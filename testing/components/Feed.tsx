import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input'

const Feed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [db]);

  // console.log(posts);
  return (
    <div className="min-h-screen text-white py-8 mx-auto w-[600px]">
      <div className="bg-black font-medium text-[20px] px-4 py-2">
        Home
      </div>
      <Input />
    </div>
  )
};

export default Feed;
