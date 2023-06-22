import React from 'react';
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { fadeIn } from '../../../styles/variations';
import { Modak, Padauk, Yaldevi } from 'next/font/google';
import { AiFillDropboxSquare } from 'react-icons/ai';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineTeam } from 'react-icons/ai';
import { useState } from 'react';
import DisplayFees from '../DisplayFees';
import CreatorFee from '../CreatorFee';
import CreatorSubscribers from '../CreatorsSubscribers';

const TotalSubsWidget = () => {
  return (
    <div className="border rounded-xl h-[300px] sm:w-[300px] sm:h-[400px] w-full shadow-md flex justfiy-between p-5 ">
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col h-full justify-between">
          <span className="font-bold text-[14px]">Subscribers</span>
          <CreatorSubscribers />
          <span className="text-[12px] border-b border-blue-700 ">See all Users</span>
        </div>

        <div className="flex flex-col justify-between">
          {/* <span className="text-[28px] font-light ">122213</span> */}
          <AiOutlineTeam className="text-[24px] p-[5px] bg-blue-200 rounded-2xl self-end" />
        </div>
      </div>
    </div>
  );
};

const CurrentSubFees = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="border rounded-xl h-[400px] sm:w-[630px] sm:h-[500px] w-full shadow-md flex p-5 justify-center items-center">
      <div className="flex flex-1 justify-center">
        <div className="h-full flex flex-col my-5">
          <span className="font-bold text-[14px] sm:text-[24px] flex justify-center">Subscription Fees</span>
          <div className="flex justify-center my-10">
            <DisplayFees />
          </div>
          <div className="flex justify-center">
            <button className="enterButton" onClick={handleModalToggle}>
              <div className="base">Change Fees</div>
              <div className="onHover">Change Fees</div>
            </button>
          </div>
        </div>
      </div>
      {showModal && <ChangeFeePopUp onClose={handleModalToggle}/>}
    </div>
  );
};

//lol onClose can't be passed as props with typescript
type ChangeFeePopUpProps = {
  onClose: () => void;
};

const ChangeFeePopUp: React.FC<ChangeFeePopUpProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-blue-200 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[300px] flex flex-col">
        <button className="text-xl place-self-end" onClick={onClose}>
          x
        </button>
        <div className="p-2 rounded">
          <CreatorFee />
        </div>
      </div>
    </div>
  );
};
// FOR POP_UP SUBSCRIBERS IF NEEDED.

// const ShowSubsPopUp = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-blue-200 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
//       <div className="w-[300px] flex flex-col">
//         <button className="text-white text-xl place-self-end" onClick={onClose}>
//           x
//         </button>
//         <div className="bg-white p-2 rounded">
//           <CreatorSubscribers />
//         </div>
//       </div>
//     </div>
//   );
// }

const TotalSubscribersCard = () => {
  return (
    <div>
      <>
        <div className='mt-20 flex flex-wrap gap-7'>
          <CurrentSubFees />
          <TotalSubsWidget />
          <TotalSubsWidget />
        </div>
      </>
    </div>
  );
};

export default TotalSubscribersCard;