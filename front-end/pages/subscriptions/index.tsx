import { ConnectButton } from "@rainbow-me/rainbowkit";
import SideBar from "../../components/sidebar/SideBar";
import UserSubscriptions from "../../components/subscriptions/UserSubscriptions";
import { useContext } from "react";
import { DarkModeContext } from "../../providers/DarkModeProvider";
import SideBarRight from "../../components/sidebar/RightSideBar";

export default function Subscriptions() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[280px] w-full mx-auto px-4 sm:px-8'>
        <div className='mt-4 flex justify-end'>
          <ConnectButton />
        </div>
        <UserSubscriptions />
      </div>
      <SideBarRight />
    </div>
  )
}
