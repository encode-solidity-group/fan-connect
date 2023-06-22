import React, { useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../../firebase'; // make sure you have initialized storage in your firebase.js file
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UpdateUsernameModal = ({queryAddress}) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [progress, setProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);

  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

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
        const userRef = doc(collection(db, 'users'), queryAddress);
        await setDoc(userRef, { profile_picture: downloadURL }, { merge: true });
      }
    );
  };


  const handleCoverFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCoverUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        const userRef = doc(collection(db, 'users'), queryAddress);
        await setDoc(userRef, { cover_photo: downloadURL }, { merge: true });
      }
    );
  };

  const handleSave = async () => {
    const userRef = doc(collection(db, 'users'), queryAddress);
    await setDoc(userRef, { username }, { merge: true });
    handleClose();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <button onClick={handleShow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Settings
      </button>

      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Update Username
                  </h3>
                  <input onChange={handleUsernameChange} type="text" className="mt-3 w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="username" name="username" required autoFocus/>
                </div>
              </div> 
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={handleClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
               <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">
                    Upload Profile Picture
                  </h3>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload}>Upload</button>
                  <progress value={progress} max="100" />
              </div>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
               <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">
                    Upload CoverPhoto
                  </h3>
                  <input type="file" onChange={handleCoverFileChange} />
                  <button onClick={handleCoverUpload}>Upload</button>
                  <progress value={coverProgress} max="100" />
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