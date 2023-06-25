import React, { createContext, useContext, useState } from 'react';
import RightSidebarProfile from '../components/sidebar/RightSidebarProfile';
import { UserAddressContext } from './UserAddressProvider';

interface SearchContextProps {
  searchValue: string;
  searchComponents: React.ReactElement<any, any>[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchComponents: React.Dispatch<React.SetStateAction<React.ReactElement<any, any>[]>>;
  handleSearch: () => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchValue: '',
  searchComponents: [],
  setSearchValue: () => { },
  setSearchComponents: () => { },
  handleSearch: () => { }
});

const SearchProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { userAddress } = useContext(UserAddressContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchComponents, setSearchComponents] = useState<React.ReactElement<any, any>[]>([]);

  const handleSearch = () => {
    if (searchValue.trim() !== '' && userAddress !== undefined) {
      const existingIndex = searchComponents.findIndex(
        component => component.props.address === searchValue
      );

      if (existingIndex !== -1) {
        // Remove the existing component from the array
        setSearchComponents(prev => [
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ]);
      }

      const newSearchComponent = (
        <RightSidebarProfile address={searchValue} />
      );

      // Add the new component at the beginning of the array
      setSearchComponents(prev => [newSearchComponent, ...prev]);

      setSearchValue('');
    }
  };

  const value: SearchContextProps = {
    searchValue,
    searchComponents,
    setSearchValue,
    setSearchComponents,
    handleSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;