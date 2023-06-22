import { useEffect, useState } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useUserInfo = (userAddress: string | string[] | undefined) => {
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");

  useEffect(() => {
    if (userAddress) {
      const userDoc = doc(collection(db, "users"), userAddress);

      const unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            if (userData.username != undefined) {
              setUserName(userData.username);
            } else {
              setUserName(userAddress);
            }
            if (userData.bio != undefined) {
              setBio(userData.bio);
            } else {
              setBio("");
            }

            if (userData.profile_picture != undefined) {
              // set profile picture if it exists
              setProfilePicture(userData.profile_picture);
            } else {
              setProfilePicture(
                "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_pfp.jpeg?alt=media&token=d63ac8a8-49e1-41b0-841f-7c71e2ed69bf"
              ); // set to default picture or leave blank if it doesn't exist
            }

            if (userData.cover_photo != undefined) {
              // set profile picture if it exists
              setCoverPhoto(userData.cover_photo);
            } else {
              setCoverPhoto(
                "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_cover.jpeg?alt=media&token=9fb8922f-6418-44b8-9492-4070737a51e3"
              ); // set to default picture or leave blank if it doesn't exist
            }
          }
        } else {
          setUserName(userAddress);
          setBio("");
          setProfilePicture(
            "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_pfp.jpeg?alt=media&token=d63ac8a8-49e1-41b0-841f-7c71e2ed69bf"
          ); // set to default picture or leave blank if document doesn't exist
          setCoverPhoto(
            "https://firebasestorage.googleapis.com/v0/b/only-blocks.appspot.com/o/images%2Fdefault_cover.jpeg?alt=media&token=9fb8922f-6418-44b8-9492-4070737a51e3"
          ); // set to default picture or leave blank if it doesn't exist
        }
      });

      // Clean up the onSnapshot listener when the component is unmounted or the userAddress changes
      return unsubscribe;
    }
  }, [userAddress]);

  return { username, bio, profilePicture, coverPhoto };
};

export default useUserInfo;
