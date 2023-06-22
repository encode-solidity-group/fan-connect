import React, { useContext, useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import UpdateUsernameModal from './UpdateUsernameModal';

const Username = ({queryAddress}) => {
  const { userAddress } = useContext(UserAddressContext);
  const [username, setUserName] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>(''); // add state for profile picture
  const [coverPhoto, setCoverPhoto] = useState<string>(''); // add state for profile picture

  useEffect(() => {
    if (queryAddress) {
      const userDoc = doc(collection(db, 'users'), queryAddress);

      const unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData) {
            if(userData.username != undefined){
              setUserName(userData.username); 
            } else {
              setUserName(queryAddress)
            }

            if(userData.profile_picture != undefined) { // set profile picture if it exists
              setProfilePicture(userData.profile_picture);
            } else {
              setProfilePicture(''); // set to default picture or leave blank if it doesn't exist
            }

            if(userData.cover_photo != undefined) { // set profile picture if it exists
                setCoverPhoto(userData.cover_photo);
              } else {
                setCoverPhoto(''); // set to default picture or leave blank if it doesn't exist
              }
          }
        } else {
          setUserName(queryAddress);
          setProfilePicture(''); // set to default picture or leave blank if document doesn't exist
          setCoverPhoto(''); // set to default picture or leave blank if it doesn't exist
        }
      });

      // Clean up the onSnapshot listener when the component is unmounted or the queryAddress changes
      return unsubscribe;
    }
  }, [queryAddress, db]);

  return (
    <div>
      <img src={coverPhoto} alt="Cover" /> {/* display the profile picture */}
      <div> Username: {username}</div>
      <img src={profilePicture} alt="Profile" /> {/* display the profile picture */}
      {(userAddress === queryAddress) && <UpdateUsernameModal queryAddress={queryAddress} />}
    </div>
  );
};

export default Username;
