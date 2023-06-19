import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { fadeIn } from '../../styles/variations';

export const Banner = () => {
  return (
    <section className="min-h-[85vh] lg:min-h-75 flex items-center">
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
                className="text-red-400 uppercase font-semibold"
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

              <Link href={`/home`}>
                <button className="enterButton">
                  <div className="base">Discover More</div>
                  <div className="onHover">Login</div>
                </button>
              </Link>
            </div>

          </div>
          <div className="hidden lg:flex items-center justify-center">
            <Image src='/redImage.png' alt='bannerImage' width={400} height={400}
              className='max-w-[400px] lg:max-w-[482px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;