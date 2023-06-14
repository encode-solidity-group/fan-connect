import { useRouter } from 'next/router';
import SideBar from "../../../components/SideBar";

function UserProfile() {
  const router = useRouter();
  const profileId = router.query.profileId;
  return (
    <div>
      <SideBar />
      This is the user profile.
      {profileId}
    </div>
  )
}

export default UserProfile;