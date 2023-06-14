import { useEffect, useState } from 'react';
import SideBar from "../../../components/SideBar";
import ProfileFeed from "../../../components/ProfileFeed"
import { useAccount } from 'wagmi';

function UserProfile() {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address])

  return (
    <div>
      <SideBar />
      {userAddress && <ProfileFeed profile_id = {userAddress}/>}
    </div>
  )
}

export default UserProfile;
