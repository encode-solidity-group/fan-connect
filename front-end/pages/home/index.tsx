import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/home/Feed';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import RightSideBar from '../../components/sidebar/RightSideBar';

const UserHome = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='flex w-full sm:ml-[175px] lg:ml-[280px]'>
        <div className="w-full max-w-[900px] px-4 sm:px-8 mx-auto">
          <div className='mt-4 flex justify-end'>
            <ConnectButton />
          </div>
          <Feed />
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default UserHome;
