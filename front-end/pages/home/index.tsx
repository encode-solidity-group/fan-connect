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
      <div className='sm:ml-[175px] lg:ml-[340px] w-full-mt-12 '>
        <div className="flex mx-auto">
          <Feed />
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default UserHome;
