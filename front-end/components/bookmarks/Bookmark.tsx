import { useContext, useEffect, useState } from 'react'
import { UserAddressContext } from '../../providers/UserAddressProvider'
import useBookmarkedPosts from '../../custom hooks/useBookmarkedPosts';
import { collection, query, where, DocumentData,onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { RenderFeed } from '../feed/RenderFeed';

export default function Bookmark() {
  const { userAddress } = useContext(UserAddressContext);
  const { bookmarkedPosts } = useBookmarkedPosts(userAddress);
  const [posts, setPosts] = useState<DocumentData[]>();

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchPosts = async () => {
      if (userAddress && bookmarkedPosts.length > 0) {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('__name__', 'in', bookmarkedPosts));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

          setPosts(fetchedPosts);
        });
      } else {
        setPosts([]);
      }
    };

    fetchPosts();

    // Clean up function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [bookmarkedPosts, userAddress]);
  

  return (
    <div>
      <div className="font-medium text-[30px] mx-4 my-2 mt-8">
        Bookmarks
      </div>
      {posts && RenderFeed(posts)}
    </div>
  )
}
