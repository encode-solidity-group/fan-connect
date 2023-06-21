import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/home/Feed';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { DarkModeContext } from '../../providers/DarkModeProvider';

const UserHome = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full mx-auto'>
        <div className="flex justify-end mr-16 mt-4">
          <ConnectButton />
        </div>
        <Feed />
      </div>
    </div>
  );
};

export default UserHome;
