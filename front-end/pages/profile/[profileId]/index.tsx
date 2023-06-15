import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SideBar from "../../../components/SideBar";
import ProfileFeed from "../../../components/ProfileFeed";
import { ConnectButton } from '@rainbow-me/rainbowkit';


function UserProfile() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  useEffect(() => {
    setId(router.query.profileId as string);
  }, [router.query]);


  return (
    <div>
      <div className='flex justify-between w-screen'>
        <SideBar />
        <div className='sm:ml-[175px] lg:ml-[340px] xl:ml-[0px] w-full'>
          <div className="flex justify-end py-16 mr-16">
            <ConnectButton />
          </div>
          {id && <ProfileFeed profile_id={id as string} />}
        </div>
      </div>

    </div>
  );
}

export default UserProfile;
