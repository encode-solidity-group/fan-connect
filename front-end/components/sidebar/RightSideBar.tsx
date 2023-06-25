import React, { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SearchContext } from '../../providers/SearchProvider';

export const SideBarRight = () => {

  const { handleSearch, searchComponents, setSearchComponents, searchValue, setSearchValue } = useContext(SearchContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClose = (index: number) => {
    setSearchComponents((prevComponents) => prevComponents.filter((_, i) => i !== index));
  };

  return (
    <div className='hidden lg:block w-[450px] border-l border-gray-500 px-8'>
      <div className='bg-[white] mt-4 flex gap-2 rounded-full border border-black py-2 px-4 items-center text-[16px] sticky top-1 z-10  text-black'>
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
      {searchComponents.map((component, index) => (
        <div key={index} className='my-8'>
          {React.cloneElement(component, { onDelete: () => handleClose(index) })}
        </div>
      ))}
    </div>
  );
};
export default SideBarRight;
