import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import SideBar from "../../../components/SideBar";
import ProfileFeed from "../../../components/ProfileFeed"

function UserProfile() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  useEffect(() => {
    setId(router.query.profileId as string)
  }, [router.query]);
  

  return (
    <div>
      <SideBar />
      {id && <ProfileFeed profile_id={id as string} />}
    </div>
  )
}

export default UserProfile;
