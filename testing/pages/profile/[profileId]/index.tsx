import { useRouter } from 'next/router';
import SideBar from "../../../components/SideBar";
import ProfileFeed from "../../../components/ProfileFeed"

function UserProfile() {
  const router = useRouter();
  const profileId = router.query.profileId;
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