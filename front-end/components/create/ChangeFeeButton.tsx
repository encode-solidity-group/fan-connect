import { useRouter } from "next/router"
import { useContractRead } from "wagmi";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import { useContext, useState } from "react";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import { QueryAddressContext } from "../../providers/QueryAddressProvider";
import { DarkModeContext } from "../../providers/DarkModeProvider";
import CreatorFee from "./CreatorFee";

export default function ChangeFeeButton() {
  const router = useRouter();

  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);
  const { contractAddress } = useGetContractAddress();
  const { darkMode } = useContext(DarkModeContext);

  const [showModal, setShowModal] = useState(false);

  const { data: iscreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [userAddress],
    watch: true,
  })

  if (!iscreator) {
    return <></>
  }
  <button
    className="enterButton mt-8"
    onClick={() => router.push(`/create/${userAddress}`)}
  >
    Change Subscription Fees
  </button>

  return (
    <>
      {queryAddress === userAddress &&
        <div>
          <button onClick={() => setShowModal(true)} className="enterButton mt-8">
            Change Subscription Fees
          </button>

          {showModal && (
            <div className={`fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className={`inline-block align-bottom ${darkMode ? 'bg-[#282828]' : 'bg-white'} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
                  <button onClick={() => setShowModal(false)} className="absolute top-0 right-0 mt-4 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500 hover:text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="p-8">
                    <CreatorFee />
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}