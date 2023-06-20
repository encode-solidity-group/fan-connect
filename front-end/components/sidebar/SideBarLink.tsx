import React from 'react'
import { IconType } from 'react-icons';

interface PageProps {
  text: string;
  Icon: IconType;
}

const SideBarLink = ({ text, Icon }: PageProps) => {
  return (
    <div className="text-[#d9d9d9] flex items-center justify-center lg:justify-start text-xl space-x-4 py-4 w-fill">
      <Icon />
      <span className="hidden lg:inline">{text}</span>
    </div>
  )
}

export default SideBarLink;
