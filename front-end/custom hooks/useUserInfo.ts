import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useUserInfo = (userAddress: string | undefined) => {
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  useEffect(() => {
    if (userAddress) {
      const userDoc = doc(db, "users", userAddress);

      const unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            if (userData.username !== undefined) {
              setUserName(userData.username);
            } else {
              setUserName(userAddress);
            }
            if (userData.bio !== undefined) {
              setBio(userData.bio);
            } else {
              setBio("");
            }

            if (userData.profile_picture !== undefined) {
              setProfilePicture(userData.profile_picture);
            } else {
              setProfilePicture(
                "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_pfp.jpeg?alt=media&token=d63ac8a8-49e1-41b0-841f-7c71e2ed69bf"
              );
            }

            if (userData.cover_photo !== undefined) {
              setCoverPhoto(userData.cover_photo);
            } else {
              setCoverPhoto(
                "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_cover.jpeg?alt=media&token=9fb8922f-6418-44b8-9492-4070737a51e3"
              );
            }
          }
        } else {
          setUserName(userAddress);
          setBio("");
          setProfilePicture(
            "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_pfp.jpeg?alt=media&token=d63ac8a8-49e1-41b0-841f-7c71e2ed69bf"
          );
          setCoverPhoto(
            "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_cover.jpeg?alt=media&token=9fb8922f-6418-44b8-9492-4070737a51e3"
          );
        }
      });

      // Clean up the onSnapshot listener when the component is unmounted or the userAddress changes
      return unsubscribe;
    }
  }, [userAddress]);

  return { username, bio, profilePicture, coverPhoto };
};

export default useUserInfo;
