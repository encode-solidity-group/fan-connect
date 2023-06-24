import React, { ReactElement, useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import Subscription from '../subscriptions/Subscription';

export const SideBarRight = () => {
  const { userAddress } = useContext(UserAddressContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchComponent, setSearchComponent] = useState<ReactElement<any, any>>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue('');
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '' && userAddress !== undefined) {
      setSearchComponent(<Subscription address={searchValue} />)
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
        className='bg-[white] mt-4 flex gap-2 rounded-full border border-black py-2 px-4 items-center text-[16px] sticky top-1 z-10  text-black'
      >
        <button onClick={handleSearch}>
          <FiSearch />
        </button>
        <input
          className='bg-transparent w-[100%] outline-none text-black'
          type="text"
          placeholder='Search Fan-Connect'
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      {searchComponent &&
        <div className='my-8'>{searchComponent}</div>
      }
    </div>
  );
};

export default SideBarRight;
