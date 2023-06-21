import React, { useContext, useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import UpdateUsernameModal from './UpdateUsernameModal';

const Username = ({queryAddress}) => {
  const { userAddress } = useContext(UserAddressContext);
  const [username, setUserName] = useState<string>('');

  useEffect(() => {
    if (queryAddress) {
      const userDoc = doc(collection(db, 'users'), queryAddress);

      const unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData && userData.username != undefined){
            setUserName(userData.username); 
          } else {
            setUserName(queryAddress)
          }
        } else {
          setUserName(queryAddress)
        }
      });

      // Clean up the onSnapshot listener when the component is unmounted or the queryAddress changes
      return unsubscribe;
    }
  }, [queryAddress, db]);

  return (
    <div>
      <div> Username: {username}</div>
      {(userAddress === queryAddress) && <UpdateUsernameModal queryAddress={queryAddress} />}
    </div>
  );
};

export default Username;