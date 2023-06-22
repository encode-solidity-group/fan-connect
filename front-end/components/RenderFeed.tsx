import { Key, useState, useContext, useEffect } from "react";
import { formatTime } from "../utils/formatTime";
import Image from "next/image";
import { DocumentData, doc, collection, getDoc } from "firebase/firestore";
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import Link from "next/link";
import { db } from "../firebase";
import { UserAddressContext } from '../providers/UserAddressProvider';
import { handleLike, userLikedPost, userBookmarkedPost, handleBookmark } from "../utils/likeBookmark"; // Import functions

export const RenderFeed = (posts: DocumentData[]) => {
  const { userAddress } = useContext(UserAddressContext);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      if(userAddress){
        const userRef = doc(collection(db, 'users'), userAddress);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setBookmarkedPosts(userData?.bookmark || []);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchBookmarkedPosts();
  }, [userAddress]);

  return posts.map((post, index: Key) => (
    <div key={index} className='border border-gray-500 my-5 rounded-md'>
      <div className='p-4 space-y-4'>
        <div className='flex justify-between'>
          <div className="flex">
            <Link href={`/profile/${post.username}`}>
              <Image src={'/../public/male1.jpg'} width={50} height={50} alt="profile photo" className="aspect-square object-cover rounded-full" />
            </Link>
            <div className="flex flex-col ml-2">
              <Link href={`/profile/${post.username}`} className="hover:text-[#3FA0EF]">
                {post.username.slice(0, 4)}...{post.username.slice(38)}
              </Link>
              <div className="text-sm text-gray-500">@{post.username.slice(0, 4)}...{post.username.slice(38)}</div>
            </div>
          </div>
          <p className="text-gray-500">{formatTime(new Date(post.timestamp.seconds * 1000).toLocaleString())}</p>
        </div>
        <div>{post.text}</div>
      </div>
      {post.image !== undefined &&
        <Link href={post.image} target="_blank" rel="noopener noreferrer">
          <Image src={post.image} alt={post.text} width={1600} height={900} className='aspect-video object-cover' />
        </Link>
      }
      {post.video !== undefined &&
        <video controls controlsList="nodownload">
          <source src={post.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      }
      <div className='p-4 flex justify-between items-center'>
        <div className="flex items-center gap-4">
          <button onClick={() => handleLike(post, userAddress)} className="hover:text-red-500">
            {userLikedPost(post, userAddress) ?
              <BsHeartFill color="red" />
               : 
              <BsHeart />
             }
          </button>
          <button className="flex items-center hover:text-[#6BD0FF]">
            <AiOutlineDollar size={20} />
            <p className="ml-2">Send Tip</p>
          </button>
        </div>
        <div className="flex">
          <button onClick={() => handleBookmark(post, userAddress, setBookmarkedPosts,bookmarkedPosts)} className="hover:text-[#6BD0FF]">
            {userBookmarkedPost(post.id, bookmarkedPosts) ? 
              <BsBookmarkFill color="#6BD0FF" />
              : 
              <BsBookmark />
            }
          </button>
        </div>
      </div>
    </div>
  ));
};
