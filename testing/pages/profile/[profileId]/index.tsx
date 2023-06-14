import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SideBar from "../../../components/SideBar";
import ProfileFeed from "../../../components/ProfileFeed"

function UserProfile() {
  const router = useRouter();
  const [profileId, setProfileId] = useState(null);
  
  useEffect(() => {
    if (router.isReady) {
      setProfileId(router.query.profileId);
    }
  }, [router.isReady]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SideBar />
      This is the user profile.
      {profileId}
      {profileId && <ProfileFeed profile_id = {profileId}/>}
    </div>
  )
}

export default UserProfile;
