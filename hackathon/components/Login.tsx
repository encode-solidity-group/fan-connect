import Image from 'next/image';
import Link from 'next/link';
import { useAccount } from 'wagmi'
import slides from './slideimages';
import { JSX } from 'react';

export default function Login() {
  const { address } = useAccount();

  const renderFeed = () => {
    const images: JSX.Element[] = [];
    slides.map((slide) => {
      images.push(<Image src={slide} alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />)
    })
    return images;
  }

  return (
    <div>
      {/* <div className="flex px-5 py-5 ">
        <div className="relative flex">
          <div className="glassMorph relative z-10 flex">
            <p className="z-10 flex">
              &#47;&#47; FANCONNECT is a platform for creators to share
              <br />
              their content with their community.
              <br />
              &#47;&#47; As a network, promoting interaction between fans and creators.
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
          <Link href={`/home`}>
            <button className="enterButton">
              <div className="base">Discover More</div>
              <div className="onHover">Login</div>
            </button>
          </Link>
          <div>
            <p>
              Connect your wallet to follow your favorite
              <br />
              creators and customize your profile.
            </p>
          </div>
        </div>
      </div>
      <div className="slider mt-44 glassMorph">
        <div className="slide-track">
          <div className="slide">
            {renderFeed()}
          </div>
        </div>
      </div> */}
    </div>

  );
}