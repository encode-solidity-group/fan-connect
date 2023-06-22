import { useContext } from 'react';
import SideBar from "../../../components/sidebar/SideBar";
import ProfileFeed from "../../../components/profile/ProfileFeed";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryAddressContext } from '../../../providers/QueryAddressProvider';
import { DarkModeContext } from '../../../providers/DarkModeProvider';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import SideBarRight from '../../../components/sidebar/RightSideBar';

function UserProfile() {
  const { queryAddress } = useContext(QueryAddressContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[280px] w-full'>
        <div className='m-4 sm:mr-8 flex justify-end'>
          <ConnectButton />
        </div>
        <ProfileHeader />
        <div className='p-4 sm:p-8 w-full'>
          {queryAddress && <ProfileFeed />}
        </div>
      </div>
      <SideBarRight />
    </div>
  );
}

export default UserProfile;
