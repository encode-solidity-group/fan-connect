import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export const SideBarRight = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      window.location.href = `/profile/${searchValue}`;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='hidden lg:block w-[450px] border-l border-gray-500 px-8'>
      <div
        className='bg-[white] mt-4 flex gap-2 rounded-full border border-black py-2 px-4 items-center text-[16px] sticky top-1 z-10 '
        onClick={handleSearch}
      >
        <FiSearch />
        <input
          className='bg-transparent w-[100%] outline-none'
          type="text"
          placeholder='Search Fan-Connect'
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SideBarRight;