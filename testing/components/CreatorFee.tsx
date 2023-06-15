import { ChangeEvent, useState } from "react";
import { ethers } from "ethers";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { ImArrowRight2, ImSpinner9 } from 'react-icons/im';
import { AiOutlineExclamationCircle, AiOutlineClose, AiOutlineCheckCircle } from 'react-icons/ai';

export default function CreatorFee() {
  const [new30dayFee, setNew30DayFee] = useState<number | undefined>();
  const [new90dayFee, setNew90DayFee] = useState<number | undefined>();
  const [new180dayFee, setNew180DayFee] = useState<number | undefined>();
  const [new365dayFee, setNew365DayFee] = useState<number | undefined>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | undefined>>) => {
    const value = parseFloat(event.target.value);
    if (Number.isNaN(value)) {
      setter(undefined);
    } else {
      setter(value);
    }
  };

  const { write, data: tx } = useContractWrite({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'changeManySubscriptionFee',
  })

  const handleSubmit = () => {
    const newPrice30Days = new30dayFee !== undefined ? ethers.utils.parseEther(new30dayFee.toString()) : undefined;
    const newPrice90Days = new90dayFee !== undefined ? ethers.utils.parseEther(new90dayFee.toString()) : undefined;
    const newPrice180Days = new180dayFee !== undefined ? ethers.utils.parseEther(new180dayFee.toString()) : undefined;
    const newPrice365Days = new365dayFee !== undefined ? ethers.utils.parseEther(new365dayFee.toString()) : undefined;

    if (
      newPrice30Days === undefined && newPrice90Days === undefined && newPrice180Days === undefined && newPrice365Days === undefined) {
      setError(true);
      return;
    }

    const daysSubscribing = [];
    const newFees = [];

    if (newPrice30Days) {
      daysSubscribing.push(30);
      newFees.push(newPrice30Days);
    }
    if (newPrice90Days) {
      daysSubscribing.push(90);
      newFees.push(newPrice90Days);
    }
    if (newPrice180Days) {
      daysSubscribing.push(180);
      newFees.push(newPrice180Days);
    }
    if (newPrice365Days) {
      daysSubscribing.push(365);
      newFees.push(newPrice365Days);
    }
    // Call contract function to update the fees using the new prices
    write({ args: [daysSubscribing, newFees] });
  };

  const { isLoading } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess() {
      setSuccess(true);
    }
  })

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="text-xl">Change Your Fees</div>
      <div className="flex flex-col space-y-4">

        <div className="flex justify-between items-center">
          <label htmlFor="new30dayFee">New 30 Day Fee</label>
          <ImArrowRight2 size={25} />
          <input
            className="text-black p-1 rounded-md w-16"
            type="number"
            id="new30dayFee"
            placeholder="(ETH)"
            value={new30dayFee ?? ''}
            min={0}
            onChange={(e) => handleFeeChange(e, setNew30DayFee)}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="new90dayFee">New 90 Day Fee</label>
          <ImArrowRight2 size={25} />
          <input
            className="text-black p-1 rounded-md w-16"
            type="number"
            id="new90dayFee"
            placeholder="(ETH)"
            value={new90dayFee ?? ''}
            min={0}
            onChange={(e) => handleFeeChange(e, setNew90DayFee)}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="new180dayFee">New 180 Day Fee</label>
          <ImArrowRight2 size={25} />
          <input
            className="text-black p-1 rounded-md w-16"
            type="number"
            id="new180dayFee"
            placeholder="(ETH)"
            value={new180dayFee ?? ''}
            min={0}
            onChange={(e) => handleFeeChange(e, setNew180DayFee)}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="new365dayFee">New 365 Day Fee</label>
          <ImArrowRight2 size={25} />
          <input
            className="text-black p-1 rounded-md w-16"
            type="number"
            id="new365dayFee"
            placeholder="(ETH)"
            value={new365dayFee ?? ''}
            min={0}
            onChange={(e) => handleFeeChange(e, setNew365DayFee)}
          />
        </div>

        <button onClick={handleSubmit} className="enterButton">
          <div className="base">Submit</div>
          <div className="onHover">Change Fees</div>
        </button>
      </div>

      {success &&
        <div className="flex flex-col justify-between lg:flex-row bg-green-700 justify-center items-center rounded-md m-2 px-2">
          <div>
            <AiOutlineCheckCircle />
          </div>
          &nbsp;Fees changed!
          <button className="text-sm align-top lg:mb-4" onClick={() => setSuccess(false)}>
            <AiOutlineClose />
          </button>
        </div>
      }

      {error &&
        <div className="flex flex-col justify-between lg:flex-row bg-[#FE5857] justify-center items-center rounded-md m-2 px-2">
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
  );
}