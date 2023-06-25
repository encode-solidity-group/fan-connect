import React, { createContext, useContext, useState } from 'react';
import RightSidebarProfile from '../components/sidebar/RightSidebarProfile';
import { UserAddressContext } from './UserAddressProvider';

interface SearchContextProps {
  searchValue: string;
  searchComponents: React.ReactElement<any, any>[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchComponents: React.Dispatch<React.SetStateAction<React.ReactElement<any, any>[]>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeComponent: (removeAddress: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchValue: '',
  searchComponents: [],
  setSearchValue: () => { },
  setSearchComponents: () => { },
  handleInputChange: () => { },
  handleSearch: () => { },
  handleKeyPress: () => { },
  removeComponent: () => { },
});

const SearchProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { userAddress } = useContext(UserAddressContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchComponents, setSearchComponents] = useState<React.ReactElement<any, any>[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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
        <RightSidebarProfile address={searchValue} removeComponent={removeComponent} />
      );

      // Add the new component at the beginning of the array
      setSearchComponents(prev => [newSearchComponent, ...prev]);

      setSearchValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const removeComponent = (removeAddress: string) => {
    const newSearchComponents = searchComponents.filter(
      component => component.props.address !== removeAddress
    );
    setSearchComponents(newSearchComponents);
  };

  const value: SearchContextProps = {
    searchValue,
    searchComponents,
    setSearchValue,
    setSearchComponents,
    handleInputChange,
    handleSearch,
    handleKeyPress,
    removeComponent,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;