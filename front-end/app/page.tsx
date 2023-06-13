'use client';
import Image from 'next/image';
import Link from 'next/link';
import GetPosts from './components/GetPosts';
import './styles/glass.css';
import './styles/button.css';
import './styles/slider.css';
import './styles/typewriter.css';

const slides = () => {
  const images = [];
  for (let i = 0; i < 30; i++) {
    images.push(<Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />)
  }
  return images;
};

export default function Home() {
  return (
    <main>
      <div className="flex px-5 py-5 ">
        <div className="relative flex py-12">
          <div className="glassMorph relative z-10 flex py-24">
            <p className="z-10 flex">
            // FANCONNECT is a platform for creators to share
              <br />
              their content with their community.
              <br />
              // As a network, promoting interaction between fans and creators.
            </p>
          </div>
          <div className="flex justify-center items-center absolute z-1 top-24 right-0   ">
            <Image className="" src="/otherpic.jpg" alt="redImage" width={500} height={300} />
          </div>
        </div>
      </div>
      <div className="justify-end z-1 top-96 right-24 absolute flex basis-1/3 position:fixed">
        <Image className="" src="/redImage.png" alt="redImage" width={500} height={300} />
      </div>
      <div className="glassMorph">
        <div className="mx-48 -mt-4 py-20 flex items-center justify-between">
          <Link href="/profile">
              <button>
                <div className="base">Discover More</div>
                <div className="onHover">Create Profile</div>
              </button>
          </Link>
          <div>
            <p>
              Connect your wallet to follow your favorite
              <br />
              creators and customize your profile.
            </p>
            {/* <GetPosts/> */}
          </div>
        </div>
      </div>
      <div className="slider mt-44 glassMorph">
        <div className="slide-track">
          <div className="slide">
            {slides()}
          </div>
        </div>
      </div>

    </main>
  );
}