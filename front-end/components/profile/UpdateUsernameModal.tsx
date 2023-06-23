import React, { ChangeEvent, useContext, useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../../firebase'; // make sure you have initialized storage in your firebase.js file
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { FiEdit, FiCheckCircle } from "react-icons/fi";
import { DarkModeContext } from '../../providers/DarkModeProvider';

const UpdateUsernameModal = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { userAddress } = useContext(UserAddressContext);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [progress, setProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [savedUsername, setSavedUsername] = useState(false);
  const [savedBio, setSavedBio] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleClose = () => {
    setUsername('');
    setBio('');
    setProgress(0);
    setCoverProgress(0);
    setFile(null);
    setCoverFile(null);
    setSavedBio(false);
    setSavedUsername(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file || file.type.includes('video')) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Track the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        // Upload completed successfully, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save the download URL to the 'profile_picture' field of the Firestore document
        const userRef = doc(collection(db, 'users'), userAddress);
        await setDoc(userRef, { profile_picture: downloadURL }, { merge: true });
        setFile(null);
      }
    );
  };

  const handleCoverFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
    }
  };

  const handleCoverUpload = async () => {
    if (!coverFile || coverFile.type.includes('video')) return;

    const storageRef = ref(storage, `images/${coverFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, coverFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Track the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCoverProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        // Upload completed successfully, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save the download URL to the 'profile_picture' field of the Firestore document
        const userRef = doc(collection(db, 'users'), userAddress);
        await setDoc(userRef, { cover_photo: downloadURL }, { merge: true });
        setCoverFile(null);
      }
    );
  };

  const handleUsernameSave = async () => {
    if (username) {
      const userRef = doc(collection(db, 'users'), userAddress);
      await setDoc(userRef, { username }, { merge: true });
      setUsername('');
      setSavedUsername(true);
    }
  };

  const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  };

  const handleBioSave = async () => {
    if (bio) {
      const userRef = doc(collection(db, 'users'), userAddress);
      await setDoc(userRef, { bio }, { merge: true });
      setBio('');
      setSavedBio(true);
    }
  };

  const handleBioChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setBio(e.target.value);
  };

  return (
    <div>
      <button onClick={handleShow} className="bg-[#3FA0EF] hover:bg-sky-600 rounded-full text-white font-bold py-2 px-2 rounded">
        <FiEdit size={24} />
      </button>

      {show && (
        <div className={`fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className={`inline-block align-bottom ${darkMode ? 'bg-[#282828]' : 'bg-white'} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
              <button onClick={handleClose} className="absolute top-0 right-0 mt-4 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500 hover:text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className={`${darkMode ? 'bg-[#282828]' : 'bg-white'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium " id="modal-title">
                    Update Username
                  </h3>
                  <input onChange={handleUsernameChange} type="text" value={username} className="mt-3 w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="username" name="username" required autoFocus />
                </div>
              </div>

              <div className="w-full px-4 sm:px-6 sm:flex sm:flex-row sm:justify-end items-center">
                <div className='ml-6'>{savedUsername ? <FiCheckCircle size={25} className='text-green-500' /> : ''}</div>
                <button onClick={handleUsernameSave} type="button" className="bg-sky-600 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-sky-700 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
              </div>

              <div className={`${darkMode ? 'bg-[#282828]' : 'bg-white'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium " id="modal-title">
                    Update Bio
                  </h3>
                  <textarea onChange={handleBioChange} value={bio} className="mt-3 w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="username" name="username" required autoFocus />
                </div>
              </div>

              <div className="w-full px-4 sm:px-6 sm:flex sm:flex-row sm:justify-end items-center">
                <div className='ml-6'>{savedBio ? <FiCheckCircle size={25} className='text-green-500' /> : ''}</div>
                <button onClick={handleBioSave} type="button" className="bg-sky-600 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-sky-700 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
              </div>

              <div className={`${darkMode ? 'bg-[#282828]' : 'bg-white'} m-6`}>
                <div className=" text-center sm:mt-0 sm:text-left">
                  <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
                    <div className='my-2'>
                      <h3 className="text-lg leading-6 font-medium " id="modal-title">
                        Upload Profile Picture
                      </h3>
                      <input type="file" onChange={handleFileChange} onClick={() => setProgress(0)} />
                    </div>
                    <button onClick={handleUpload} className='text-white w-full sm:w-fit border border-transparent px-4 py-2 h-fit bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm'>Upload</button>
                  </div>

                  {progress > 1 && <progress value={progress} max="100" className='w-full' />}

                  {file &&
                    <div className="relative mt-4">
                      <div
                        className={`absolute w-8 h-8 ${darkMode ? 'bg-[#15181c] hover:[#272c26]' : 'bg-gray-400 hover: gray-600'} bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer`}
                        onClick={() => setFile(null)}
                      >
                        <AiOutlineClose className='h-5' />
                      </div>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="uploaded media"
                        className='rounded-2xl max-h-80 object-contain'
                        width={500}
                        height={500}
                      />
                    </div>
                  }
                </div>
              </div>

              <div className={`${darkMode ? 'bg-[#282828]' : 'bg-white'} m-6`}>
                <div className=" text-center sm:mt-0 sm:text-left">
                  <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
                    <div className='my-2'>
                      <h3 className="text-lg leading-6 font-medium " id="modal-title">
                        Upload Cover Photo
                      </h3>
                      <input type="file" onChange={handleCoverFileChange} onClick={() => setCoverProgress(0)} />
                    </div>
                    <button onClick={handleCoverUpload} className='text-white w-full sm:w-fit border border-transparent px-4 py-2 h-fit bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm'>Upload</button>
                  </div>

                  {coverProgress > 1 && <progress value={progress} max="100" className='w-full' />}

                  {coverFile &&
                    <div className="relative mt-4">
                      <div
                        className={`absolute w-8 h-8 ${darkMode ? 'bg-[#15181c] hover:[#272c26]' : 'bg-gray-400 hover: gray-600'} bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer`}
                        onClick={() => setCoverFile(null)}
                      >
                        <AiOutlineClose className='h-5' />
                      </div>
                      <Image
                        src={URL.createObjectURL(coverFile)}
                        alt="uploaded media"
                        className='rounded-2xl max-h-80 object-contain'
                        width={500}
                        height={500}
                      />
                    </div>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default UpdateUsernameModal;