import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="z-20 mt-4">
      <div className="mx-5 flex">
        <div className="logo basis-2/3 bg-">
          <Link href="/">
            <Image src="/logo.png" alt="FanConnect Logo" width={200} height={100}
            />
          </Link>
        </div>
        <div className="flex justify-evenly basis-1/3 items-center">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
