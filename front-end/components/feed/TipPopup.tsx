import React, { useState, useContext, useEffect } from 'react';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import { toast } from 'react-toastify';

interface TipPopupProps {
  handleClose: () => void;
  recAddr: string;
}

const TipPopup: React.FC<TipPopupProps> = ({ handleClose, recAddr }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [tipValue, setTipValue] = useState('0');

  const { sendTransaction, data } = useSendTransaction({
    to: recAddr,
    value: ethers.utils.parseEther((tipValue !== "" ? tipValue : "0")).toBigInt(),
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleTipSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    sendTransaction();
  };

  useEffect(() => {
    if (isLoading) {
      toast.info('Tip Processing! Please wait a moment.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tip Sent!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-10`}>
      <form onSubmit={handleTipSubmit} className={`p-6 rounded shadow-lg flex flex-col items-center relative ${darkMode ? 'bg-[#282828]' : 'bg-white'}`}>
        <button onClick={handleClose} className="absolute top-0 right-0 mt-4 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500 hover:text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <label htmlFor="tipValue" className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Enter tip value:</label>
        <input type="number" id="tipValue" name="tipValue" className="border-2 border-gray-300 p-2 rounded mb-4" value={tipValue} onChange={(e) => setTipValue(e.target.value)} required />
        <button type="submit" className="bg-sky-600 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-sky-700 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          {isLoading ? 'Submitting...' : isSuccess ? 'Tip Sent' : 'Submit Tip'}
        </button>
      </form>
    </div>
  );
};

export default TipPopup;
