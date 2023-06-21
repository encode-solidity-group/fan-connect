import React, { useContext } from 'react'
import { DarkModeContext } from '../providers/DarkModeProvider'
import { BsMoonFill, BsSun } from 'react-icons/bs';

export default function DarkModeButton() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button>
      {darkMode ?
        <BsSun onClick={toggleDarkMode} />
        :
        <BsMoonFill onClick={toggleDarkMode} />
      }
    </button>
  )
}
