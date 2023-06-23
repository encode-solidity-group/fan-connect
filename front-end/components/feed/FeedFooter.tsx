import React, { useState, useContext } from 'react'
import { AiOutlineDollar } from 'react-icons/ai'
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { handleLike, userLikedPost, handleBookmark, userBookmarkedPost } from '../../utils/likeBookmark'
import useBookmarkedPosts from '../../custom hooks/useBookmarkedPosts';
import { DocumentData } from 'firebase/firestore';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import TipPopup from './TipPopup';

interface PageProps {
  post: DocumentData;
}

export default function FeedFooter({ post }: PageProps) {
  const { userAddress } = useContext(UserAddressContext);
  const { bookmarkedPosts, setBookmarkedPosts } = useBookmarkedPosts(userAddress);
  const [showTipPopup, setShowTipPopup] = useState(false);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center text-gray-500'>
        <div className="flex items-center gap-4">
          {userAddress && 
        <button onClick={() => handleLike(post, userAddress)} className="hover:text-red-500">
            {userLikedPost(post, userAddress) ?
              <BsHeartFill color="red" />
              :
              <BsHeart />
            }
          </button>
        }
        <button className="flex items-center hover:text-[#6BD0FF]" onClick={() => setShowTipPopup(true)}>
            <AiOutlineDollar size={20} />
            <p className="ml-2">Send Tip</p>
          </button>
          {showTipPopup && <TipPopup handleClose={() => setShowTipPopup(false)} recAddr = {post.username} />}
      </div>
        <div className="flex">
          {userAddress && 
        <button onClick={() => handleBookmark(post, userAddress, setBookmarkedPosts, bookmarkedPosts)} className="hover:text-[#6BD0FF]">
            {userBookmarkedPost(post.id, bookmarkedPosts) ?
              <BsBookmarkFill color="#6BD0FF" />
              :
              <BsBookmark />
            }
          </button>
          }
      </div>
      </div>
      <div className='text-sm'>
        {post.liked?.length === 1 &&
          <p>{post.liked?.length} like</p>
        }
        {post.liked?.length > 1 &&
          <p>{post.liked?.length} likes</p>
        }
      </div>
    </div>
  )
}
