import React, { createContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

// Define the context interface
interface UserAddressContextData {
  userAddress: string | undefined;
}

// Create the context instance
export const UserAddressContext = createContext<UserAddressContextData>({
  userAddress: undefined,
});

export default function UserAddressProvider({ children }: React.PropsWithChildren<{}>) {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  // Define the context value
  const contextValue: UserAddressContextData = {
    userAddress: userAddress,
  };

  return (
    <UserAddressContext.Provider value={contextValue}>
      {children}
    </UserAddressContext.Provider>
  );
}