import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState, createContext } from 'react';
import { UserAddressContext } from './UserAddressProvider';
import { db } from '../firebase';

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { }
});

export default function DarkModeProvider({ children }: React.PropsWithChildren<{}>) {
  const { userAddress } = useContext(UserAddressContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const updateDarkModePreference = async () => {
      if (userAddress) {
        const userDocRef = doc(db, 'users', userAddress);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const darkModePreference = userDocSnap.data()?.darkMode;
          setDarkMode(darkModePreference);
          document.documentElement.classList.toggle('dark', darkModePreference);
        } else {
          setDarkMode(false);
        }
      }
    };

    updateDarkModePreference();
  }, [userAddress]);

  const toggleDarkMode = async () => {
    if (userAddress) {
      const newDarkModePreference = !darkMode;
      setDarkMode(newDarkModePreference);
      document.documentElement.classList.toggle('dark', newDarkModePreference);
      const userDocRef = doc(db, 'users', userAddress);
      await setDoc(userDocRef, { darkMode: newDarkModePreference }, { merge: true });
    }
  };

  const contextValue = {
    darkMode,
    toggleDarkMode
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}
