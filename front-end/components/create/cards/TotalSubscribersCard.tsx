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
  const [subsModal, setSubsModal] = useState(false);

  const handleSubsModalToggle = () => {
    setSubsModal(!subsModal);
  };
  return (
    <div className="border rounded-xl h-[300px] w-full sm:h-[400px] shadow-md flex justfiy-center p-5 ">
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col h-full justify-between">
          <span className="font-bold text-[24px] justify-center flex">Subscribers</span>
          <CreatorSubscribers />
          <div className="flex justify-center">
            {/* <button className="enterButton" onClick={handleSubsModalToggle}>
              <div className="base">View Subscribers</div>
              <div className="onHover">View Subscribers</div>
            </button> */}
          </div>
        </div>
      </div>
      {subsModal && <ShowSubsPopUp onClose={handleSubsModalToggle} />}

    </div>
  );
};

type ShowSubsPopUpProps = {
  onClose: () => void;
};
const ShowSubsPopUp: React.FC<ChangeFeePopUpProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-blue-200 bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
      <div className="flex flex-col border-[2px] border-blue-800 rounded-xl bg-blue-200 text-black">
        <div className="sm:m-24 m-20 bg-blue-200 ">
          <div className="flex justify-end">
            <button className="text-lg place-self-end border-black" onClick={onClose}>
              x
            </button>
          </div>
          <div className="bg-white p-2 rounded">
            <CreatorSubscribers />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componenet on line 109 takes the DisplayFees component that's imported and show immediately. The button componenet renders the ChangeFeePopUp modal when clicked
const CurrentSubFees = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-xl w-full shadow-md flex p-5 justify-center items-center ">
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
      {showModal && <ChangeFeePopUp onClose={handleModalToggle} />}
    </div>
  );
};

type ChangeFeePopUpProps = {
  onClose: () => void;
};
const ChangeFeePopUp: React.FC<ChangeFeePopUpProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-blue-200 bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
      <div className="flex flex-col border-[2px] border-blue-800 rounded-xl bg-blue-300">
        <div className="sm:m-24 m-20 ">
          <div className="flex justify-end">
            <button className="text-lg place-self-end  border-black" onClick={onClose}>
              x
            </button>
          </div>
          <div className="p-2 rounded">
            <CreatorFee />
          </div>
        </div>
      </div>
    </div>
  );
};
// FOR POP_UP SUBSCRIBERS IF NEEDED.


const TotalSubscribersCard = () => {
  return (

    <div className='flex flex-wrap gap-4 sm:gap-8 py-4 sm:py-8'>
      <CurrentSubFees />
      <div className='grid min-[900px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 w-full gap-4 sm:gap-8'>
        <TotalSubsWidget />
      </div>
    </div>
  );
};

export default TotalSubscribersCard;