import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-[#3FA0EF] to-blue-400 lg:py-12 py-36">
      <div className='flex justify-evenly items-center'>
        <Image src='/blueLogo.png' alt='logoFooter' width={100} height={100} />
        <h3 className="text-white">
          <span className="text-[16px] tracking-[2px] flex items-center justify-center">FAN-CONNECT </span><span className='text-[12px]'>2023 © All Rights Reserved.</span>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
