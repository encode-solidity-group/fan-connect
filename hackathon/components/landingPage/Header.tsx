import React from 'react'
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Image src="/logo.png"  alt="logo" width={200} height={200} />
          <ConnectButton />
        </div>

      </div>
    </header>
  )
}

export default Header