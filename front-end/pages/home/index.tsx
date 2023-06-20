import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/home/Feed';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const UserHome = () => {
  return (
    <div>
      <div className='flex justify-between w-screen'>
        <SideBar />
        <div className='sm:ml-[175px] lg:ml-[340px] w-full mx-auto'>
          <div className="flex justify-end mr-16 mt-4">
            <ConnectButton />
          </div>
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
