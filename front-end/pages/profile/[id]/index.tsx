import { useContext } from 'react';
import SideBar from "../../../components/sidebar/SideBar";
import ProfileFeed from "../../../components/profile/ProfileFeed";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryAddressContext } from '../../../providers/QueryAddressProvider';

function UserProfile() {
  const { queryAddress } = useContext(QueryAddressContext);

  return (
    <div>
      <div className='flex justify-between w-screen'>
        <SideBar />
        <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
          <div className="flex justify-end mt-4 mr-16">
            <ConnectButton />
          </div>
          {queryAddress && <ProfileFeed />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
