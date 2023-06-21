import { useContext } from 'react';
import SideBar from "../../../components/sidebar/SideBar";
import ProfileFeed from "../../../components/profile/ProfileFeed";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryAddressContext } from '../../../providers/QueryAddressProvider';
import { DarkModeContext } from '../../../providers/DarkModeProvider';

function UserProfile() {
  const { queryAddress } = useContext(QueryAddressContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
        <div className="flex justify-end mt-4 mr-16">
          <ConnectButton />
        </div>
        {queryAddress && <ProfileFeed />}
      </div>
    </div>
  );
}

export default UserProfile;
