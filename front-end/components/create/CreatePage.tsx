import { useState, useEffect } from "react";
import { ImArrowRight2, ImSpinner9 } from "react-icons/im";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { ethers } from "ethers";
import { AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";
import { toast } from "react-toastify";

interface SubscriptionFees {
  '30'?: string;
  '90'?: string;
  '180'?: string;
  '365'?: string;
}

export default function CreatePage() {
  const [subscriptionFees, setSubscriptionFees] = useState<SubscriptionFees>({});
  const [error, setError] = useState(false);

  const { contractAddress } = useGetContractAddress();

  const { data: tx, write: createPage } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'createPage',
    args: [
      subscriptionFees['30'] ? ethers.utils.parseEther(subscriptionFees['30']) : undefined,
      subscriptionFees['90'] ? ethers.utils.parseEther(subscriptionFees['90']) : undefined,
      subscriptionFees['180'] ? ethers.utils.parseEther(subscriptionFees['180']) : undefined,
      subscriptionFees['365'] ? ethers.utils.parseEther(subscriptionFees['365']) : undefined,
    ]
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx?.hash,
  });

  const handleSubmit = () => {
    if (!subscriptionFees['30'] || !subscriptionFees['90'] || !subscriptionFees['180'] || !subscriptionFees['365']) {
      setError(true);
      return
    }
    setError(false);
    createPage();
  }

  useEffect(() => {
    if (isLoading) {
      toast.info('Building your community! Please wait a moment.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Community Created!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center my-8">
      <div className="flex flex-col space-y-4">
        <div className="text-center text-2xl">Set your fees to get started</div>

        <div className="flex justify-between items-center">
          <label htmlFor="30dayFee">Set 30 Day Subscription Fee</label>
          <ImArrowRight2 size={25} className="mx-2" />
          <input
            className="text-black p-1 rounded-md w-20 border border-gray-500 border-gray-500"
            type="number"
            id="30dayFee"
            placeholder="(ETH)"
            min={0}
            value={subscriptionFees['30'] || ''}
            onChange={(e) => setSubscriptionFees({ ...subscriptionFees, '30': e.target.value })}
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="90dayFee">Set 90 Day Subscription Fee</label>
          <ImArrowRight2 size={25} className="mx-2" />
          <input
            className="text-black p-1 rounded-md w-20 border border-gray-500"
            type="number"
            id="90dayFee"
            placeholder="(ETH)"
            min={0}
            value={subscriptionFees['90'] || ''}
            onChange={(e) => setSubscriptionFees({ ...subscriptionFees, '90': e.target.value })}
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="180dayFee">Set 180 Day Subscription Fee</label>
          <ImArrowRight2 size={25} className="mx-2" />
          <input
            className="text-black p-1 rounded-md w-20 border border-gray-500"
            type="number"
            id="180dayFee"
            placeholder="(ETH)"
            min={0}
            value={subscriptionFees['180'] || ''}
            onChange={(e) => setSubscriptionFees({ ...subscriptionFees, '180': e.target.value })}
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="365dayFee">Set 365 Day Subscription Fee</label>
          <ImArrowRight2 size={25} className="mx-2" />
          <input
            className="text-black p-1 rounded-md w-20 border border-gray-500"
            type="number"
            id="365dayFee"
            placeholder="(ETH)"
            min={0}
            value={subscriptionFees['365'] || ''}
            onChange={(e) => setSubscriptionFees({ ...subscriptionFees, '365': e.target.value })}
          />
        </div>

        <button onClick={() => handleSubmit()} className="enterButton mx-auto">
          <div>Start Creating</div>
        </button>

        {error &&
          <div className="flex flex-col justify-between lg:flex-row bg-red-300 text-black justify-center items-center rounded-md m-2 px-2">
            <div>
              <AiOutlineExclamationCircle />
            </div>
            &nbsp;Please set valid fees!
            <button className="text-sm align-top lg:mb-4" onClick={() => setError(false)}>
              <AiOutlineClose />
            </button>
          </div>
        }

        {isLoading && <ImSpinner9 className="animate-spin mx-auto" />}

      </div>
    </div>
  );
}