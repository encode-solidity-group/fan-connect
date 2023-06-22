import { Key } from "react";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import FeedHeader from "./FeedHeader";
import FeedFooter from "./FeedFooter";

export const RenderFeed = (posts: DocumentData[]) => {

  return posts.map((post, index: Key) => (
    <div key={index} className='border border-gray-500 my-5 rounded-md'>
      <FeedHeader userAddress={post.username} timestamp={post.timestamp.seconds} text={post.text} />
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
      <FeedFooter post={post} />
    </div>
  ));
};
