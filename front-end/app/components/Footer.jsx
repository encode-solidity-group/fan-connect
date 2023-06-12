'use client'
import Link from 'next/link';

export default function Header() {
  return (
    <footer className="z-20 ">
        <div className="flex justify-evenly basis-1/3 items-center ">
          <Link href="/about" className="py-20 px-20 basis-1/2 bg-[#eac1db]">About Fan Connect</Link>
          <Link href="/contact" className="py-20 px-20 basis-1/2 bg-[#9d1e31]">Contact Us</Link>
        </div>
    </footer>
  );
}