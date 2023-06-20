import Link from 'next/link';
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai'
import { useContext } from 'react';
import { UserAddressContext } from '../../providers/UserAddressProvider';

export default function Header() {
  const {userAddress} = useContext(UserAddressContext);
  
  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50 ">
      <div className="container mx-auto ">

        <div className="w-full  h-[96px] backdrop-blur-md max-w-[360px] mx-auto flex justify-between text-2xl text-[#6BD0FF] items-center">
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={'/home'}>
            <AiFillHome />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/profile/${userAddress}`}>
            <AiOutlineUser />
          </Link>
          <Link className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" href={`/profile/${userAddress}/community`}>
            <AiOutlineTeam />
          </Link>
        </div>

      </div>

    </nav>
  );
}
