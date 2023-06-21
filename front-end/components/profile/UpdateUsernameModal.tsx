import React, { useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

const UpdateUsernameModal = ({queryAddress}) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUsernameModal;