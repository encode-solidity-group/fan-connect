import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useContext } from 'react'
import SideBarRight from '../../components/sidebar/RightSideBar'
import SideBar from '../../components/sidebar/SideBar'
import { DarkModeContext } from '../../providers/DarkModeProvider'
import Bookmark from '../../components/bookmarks/Bookmark'
import Nav from '../../components/landingPage/Nav';

export default function Bookmarks() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[280px] w-full mx-auto px-4 sm:px-8'>
        <div className='mt-4 flex justify-end'>
          <ConnectButton />
        </div>
        <Bookmark />
      </div>
      <SideBarRight />
      <Nav />
    </div>
  )
}
