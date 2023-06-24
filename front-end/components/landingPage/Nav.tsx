import Link from 'next/link';
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai'
import { useContext } from 'react';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { RiBankLine, RiHeartsLine } from "react-icons/ri"

export default function Nav() {
  const {userAddress} = useContext(UserAddressContext);
  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50 sm:hidden">
      <div className="container mx-auto ">
        <div className="w-full h-[96px] backdrop-blur-md max-w-[480px] mx-auto flex justify-between text-2xl text-[#216788] items-center">
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={'/home'}>
            <AiFillHome />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/profile/${userAddress}`}>
            <AiOutlineUser />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/create/${userAddress}`}>
            <RiBankLine />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/subscriptions`}>
            <RiHeartsLine />
          </Link>
        </div>

      </div>
    </nav>
  );
}
