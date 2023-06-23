import React, { useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { fadeIn } from '../../styles/variations';
import { useAccount } from 'wagmi';
import { AiOutlineExclamationCircle, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';

export const Banner = () => {
  const { isConnected } = useAccount();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (isConnected) {
      router.push('/home');
    } else {
      setError(true);
    }
  };

  return (
    <section className="min-h-[85vh] lg:min-h-75 flex items-center justify-center ">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.8 }}
              className="text-[55px] leading-[0.8] lg:text-[100px]">
              FAN <span>CONNECT</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.8 }}
              className="mb-6 text-[36px] lg:text-[60px] leading-[1]">
              <span className="">is </span>
              <TypeAnimation sequence={[
                "creator owned.",
                2000,
                "fan owned.",
                2000,
                "your community.",
                2000,
              ]}
                speed={50}
                className="text-[#4396bd] uppercase font-semibold"
                wrapper='span'
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn("up", 0.9)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.8 }}>
              Have complete control over your fans, content and community. Cheaper fees, faster payments, and more anonymity.
            </motion.p>

            <div className="py-6">

              <button className="enterButton" onClick={handleClick}>
                <div className="base">Discover More</div>
                <div className="onHover">Login</div>
              </button>

              {error &&
                <div className="flex max-w-[400px] gap-4 max-lg:mx-auto justify-center items-center rounded-md m-2 w-fit px-2">
                  <div>
                    <AiOutlineExclamationCircle />
                  </div>
                  &nbsp;Connect your wallet to login!
                  <button className="text-sm align-top lg:mb-4" onClick={() => setError(false)}>
                    <AiOutlineClose />
                  </button>
                </div>
              }
            </div>

          </div>
          <div className="hidden lg:flex items-center justify-center">
            <Image src='/woman1.jpg' alt='bannerImage' width={400} height={400}
              className='max-w-[400px] lg:max-w-[482px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;