import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { useState, ChangeEvent, useContext } from "react";
import { AiOutlineExclamationCircle, AiOutlineClose, AiOutlineCheckCircle } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/im';
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import { UserAddressContext } from "../../providers/UserAddressProvider";

export default function ContractFee() {
  const {userAddress} = useContext(UserAddressContext);
  const [newFee, setNewFee] = useState<number | undefined>();
  const [error, setError] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);
  const {contractAddress} = useGetContractAddress();

  const { data: tx, write: changeContractFee } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'changeContractFee',
  });

  const { data: owner } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'owner',
    watch: true
  });

  const { isLoading } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess() {
      setSuccess(true);
      setNewFee(undefined);
    }
  })

  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setNewFee(Number.isNaN(value) ? undefined : value);
  };

  const submitNewFee = () => {
    if (typeof newFee !== 'undefined' && newFee >= 0) {
      setError(false);
      changeContractFee({ args: [newFee] });
    } else {
      setError(true);
    }
  }

  return (
    <>
      {owner && userAddress && owner === userAddress &&
        <div className="mx-auto my-8 text-xl space-y-4 max-w-[175px] lg:max-w-[340px] text-center border-t">

          <div className="text-center mt-8 text-[#FE5857] text-2xl lg:text-3xl">
            Change Contract Fee
          </div>

          <div>
            <label htmlFor="newFee">New Fee:</label>
            {' '}
            <input
              className="text-black p-1 rounded-md w-16"
              type="number"
              id="newFee"
              placeholder="%"
              value={newFee?.toString() || ''}
              min={0}
              onChange={handleFeeChange}
            />
          </div>

          <button className="enterButton max-w-[166px] lg:max-w-[340px]" onClick={() => submitNewFee()} disabled={isLoading}>
            <div className="base">Set Fee</div>
            <div className="onHover">Set Fee</div>
          </button>

          {error &&
            <div className="flex flex-col justify-between lg:flex-row bg-[#FE5857] justify-center items-center rounded-md max-w-[175px] lg:max-w-[340px] m-2 px-2">
              <div>
                <AiOutlineExclamationCircle />
              </div>
              &nbsp;Please set a valid fee!
              <button className="text-sm align-top lg:mb-4" onClick={() => setError(false)}>
                <AiOutlineClose />
              </button>
            </div>
          }
          {success &&
            <div className="flex flex-col justify-between lg:flex-row bg-green-700 justify-center items-center rounded-md max-w-[175px] lg:max-w-[340px] m-2 px-2">
              <div>
                <AiOutlineCheckCircle />
              </div>
              &nbsp;Fee changed!
              <button className="text-sm align-top lg:mb-4" onClick={() => setSuccess(false)}>
                <AiOutlineClose />
              </button>
            </div>
          }
          {isLoading && <ImSpinner9 className="animate-spin mx-auto" />}
        </div>}
    </>
  );
}
