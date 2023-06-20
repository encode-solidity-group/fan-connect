import { useRouter } from 'next/router';
import React, { useEffect, useState, createContext } from 'react'

// Define the context interface
interface QueryAddressContextData {
  queryAddress: string | string[] | undefined;
}

// Create the context instance
export const QueryAddressContext = createContext<QueryAddressContextData>({
  queryAddress: undefined,
});

export default function QueryAddressProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { id } = router.query;

  const [queryAddress, setQueryAddress] = useState<string | string[] | undefined>();

  useEffect(() => {
    if (id) {
      setQueryAddress(id);
    }
  }, [id]);

  // Define the context value
  const contextValue: QueryAddressContextData = {
    queryAddress: queryAddress,
  };

  return (
    <QueryAddressContext.Provider value={contextValue}>
      {children}
    </QueryAddressContext.Provider>
  );
}
