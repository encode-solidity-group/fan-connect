import React, { useContext, useState } from 'react';
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import useUserInfo from '../../custom hooks/useUserInfo';

const Input = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { userAddress } = useContext(UserAddressContext);

  const { profilePicture } = useUserInfo(userAddress);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const sendPost = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      username: userAddress,
      text: input,
      timestamp: serverTimestamp(),
    });

    if (selectedFile) {
      const fileRef = ref(storage, `posts/${docRef.id}/${selectedFile.name}`);

      if (selectedFile.type.includes('image')) {
        // For image uploads
        await uploadBytes(fileRef, selectedFile).then(async () => {
          const downloadURL = await getDownloadURL(fileRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            image: downloadURL,
          });
        });
      } else if (selectedFile.type.includes('video')) {
        // For video uploads
        await uploadBytesResumable(fileRef, selectedFile).then(async () => {
          const downloadURL = await getDownloadURL(fileRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            video: downloadURL,
          });
        });
      }
    }

    setLoading(false);
    setInput('');
    setSelectedFile(null);
  };

  return (
    <div className={`mt-4 px-4 ${loading && "opacity-60"}`}>
      <div className='grid grid-cols-[48px,1fr] gap-4'>
        <div>
          <Image
            className='h-12 w-12 rounded-full object-contain'
            src={profilePicture}
            width={500}
            height={500}
            alt="profile picture"
          />
        </div>
        <div className='border-y border-gray-500 py-2'>
          <textarea
            className='w-[100%] bg-transparent outline-none text-[20px]'
            rows={2}
            placeholder="Share something new with your fans!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div className="relative mb-4">
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose className='h-5' />
              </div>
              {selectedFile.type.includes('image') ? (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="uploaded media"
                  className='rounded-2xl max-h-80 object-contain'
                  width={500}
                  height={500}
                />
              ) : (
                <video controls controlsList="nodownload" className='rounded-2xl max-h-80 object-contain'>
                  <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                  width={500}
                  height={500}
                </video>
              )}
            </div>
          )}
          {!loading && (
            <div className='flex justify-between items-center'>
              <div className='flex gap-4 text-[20px] text-[#1d9bf0]'>
                <label htmlFor="file">
                  <BsImage className='cursor-pointer' />
                </label>
                <input
                  id="file"
                  type="file"
                  hidden
                  onChange={addImageToPost}
                />

                <label htmlFor="file">
                  <BsCameraVideo className='cursor-pointer' />
                </label>
                <input
                  id="file"
                  type="file"
                  hidden
                  onChange={addImageToPost}
                />
              </div>
              <button
                className="bg-[#3FA0EF] rounded-full px-4 py-1.5 font-bold shadow-md cursor-pointer"
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
