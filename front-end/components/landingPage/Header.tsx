import React from 'react'
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DarkModeButton from '../DarkModeButton';

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Image src="/blueLogo.png" alt="logo" width={200} height={200} />
          <div className='flex items-center'>
            <ConnectButton />
            <div className='ml-4'>
              <DarkModeButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header