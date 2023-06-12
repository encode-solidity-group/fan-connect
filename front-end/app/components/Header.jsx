import Link from 'next/link';
import Image from 'next/image'

export default function Header() {
  return (
    <header className="z-20 ">
      <div className="mx-5 flex">
        <div className="logo basis-2/3 bg-">
          <Link href="/">
            <Image src="/logo.png" alt="OnlyBlocks Logo" width={200} height={100}
            />
             </Link>
        </div>
        <div className="flex justify-evenly basis-1/3 items-center">
          <Link href="/about">About Fan Connect</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}