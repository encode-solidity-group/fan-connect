import React, { useState,useContext } from 'react';
import { QueryAddressContext } from '../../providers/QueryAddressProvider';
import {useSendTransaction} from 'wagmi'
import {ethers} from 'ethers'

interface TipPopupProps {
    handleClose: () => void;
    recAddr: string; 
  }

const TipPopup: React.FC<TipPopupProps> = ({ handleClose,recAddr }) => {
  const [tipValue, setTipValue] = useState('0');
  const { queryAddress } = useContext(QueryAddressContext);
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: recAddr,
    value: ethers.utils.parseEther(tipValue).toBigInt(),
  })

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // add your submit handler logic here
    sendTransaction();
    // reset tip value and close the popup after submitting
    setTipValue('0');
    handleClose();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
      <form onSubmit={handleTipSubmit} className="bg-white p-6 rounded shadow-lg flex flex-col items-center relative">
        <button onClick={handleClose} className="absolute right-3 top-3 text-lg font-bold text-black">X</button>
        <label htmlFor="tipValue" className="mb-2 text-lg">Enter tip value:</label>
        <input type="number" id="tipValue" name="tipValue" className="border-2 border-gray-300 p-2 rounded mb-4" value={tipValue} onChange={(e) => setTipValue(e.target.value)} required />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit Tip</button>
      </form>
    </div>
  )
}

export default TipPopup;
