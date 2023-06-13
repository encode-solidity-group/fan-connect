import React from 'react'

const SideBarLink = ({text, Icon}) => {
  return (
    <div className="text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 px-4 py-2 w-fill">
      <Icon />
      <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SideBarLink;
