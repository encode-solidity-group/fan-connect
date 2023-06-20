import { ConnectButton } from "@rainbow-me/rainbowkit";
import SideBar from "../../../components/sidebar/SideBar";

export default function UserSubscriptions() {
  return (
    <div>
      <div className='flex justify-between w-screen'>
        <SideBar />
        <div className='sm:ml-[175px] lg:ml-[340px] w-full mx-auto'>
          <div className="flex justify-end mr-16 mt-4">
            <ConnectButton />
          </div>

        </div>
      </div>
    </div>
  )
}
