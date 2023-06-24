import Link from 'next/link';
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { useContext } from 'react';
import { RiBankLine, RiHeartsLine, RiBookmark3Line } from "react-icons/ri";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { DarkModeContext } from "../../providers/DarkModeProvider";
import DarkModeButton from '../DarkModeButton';






export default function Nav() {

  const { userAddress } = useContext(UserAddressContext);
  const { darkMode } = useContext(DarkModeContext);



  if (typeof userAddress === 'undefined') {
    return (
      <nav className="fixed w-full h-full overflow-hidden z-50 backdrop-blur-lg backdrop-opacity-40 bg-white bg-opacity-75 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="w-full max-w-[480px] mx-auto text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="py-5 font-bold">
                CONNECT WALLET TO CONTINUE
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed bottom-1 lg:bottom-8 w-full overflow-hidden bg-opacity-30 z-50 sm:hidden ${darkMode && 'dark-modeNav'}`}>
      <div className="container mx-auto ">
        <div className="w-full h-[96px] backdrop-blur-md max-w-[480px] mx-auto flex justify-between text-2xl  items-center">
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={'/home'}>
            <AiFillHome />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/subscriptions`}>
            <RiHeartsLine />
          </Link>
          <Link className="w-[60px] h-[60px] flex items-center justify-center "href={`/bookmarks`}>
            <RiBookmark3Line />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/create/${userAddress}`}>
            <RiBankLine />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/profile/${userAddress}`}>
            <AiOutlineUser />
          </Link>
          <div className='w-[60px] h-[60px] flex items-center justify-center'>
            <DarkModeButton />
          </div>

        </div>

      </div>
    </nav>
  );
}
