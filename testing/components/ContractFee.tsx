import { useContractWrite } from "wagmi";
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { useState, ChangeEvent } from "react";
import { AiFillWarning } from 'react-icons/ai';

export default function ContractFee() {
  const [newFee, setNewFee] = useState<number | undefined>();
  const [alert, setAlert] = useState<Boolean>(false);

  const { data: tx } = useContractWrite({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'changeContractFee',
  });

  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setNewFee(Number.isNaN(value) ? undefined : value);
  };

  const submitNewFee = () => {
    if (typeof newFee !== 'undefined' && newFee >= 0) {
      console.log('good');
    } else {
      console.log('bad');
      setAlert(true);
    }
  }

  return (
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

      <button className="enterButton max-w-[166px] lg:max-w-[340px]" onClick={() => submitNewFee()}>
        <div className="base">Set Fee</div>
        <div className="onHover">Set Fee</div>
      </button>

      <div className="flex flex-col lg:flex-row bg-[#FE5857] justify-center items-center rounded-md max-w-[175px] lg:max-w-[340px] m-2">
        <div>
          <AiFillWarning />
        </div>
        &nbsp;Please set a valid fee
      </div>

    </div>
  );
}
