import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeIn } from '../../styles/variations';
import Image from 'next/image';

export const About = () => {
  const [ref, inView] = useInView(
    {
      threshold: 0.5
    }
  );
  return (
    <section className="min-h-[85vh] lg:min-h-75 flex items-center md:px-24 xs:px-0 -my-24" ref={ref}>
      <div className="containter mx-auto">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-12">
          <div>

          </div>
          <div className="flex-2 text-center lg:text-left">
          <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.8 }}
              className="text-[55px] leading-[0.8] lg:text-[100px] mb-6 text-[#6BD0FF]">
              <span>FANS</span>
            </motion.h1>
            <h2 className="mb-6">
              Interact with your favorite creators, get exclusive content, and support your favorite creators. Securely, and instantly, subscribe do your favorite creators with more anonymity than ever before.
            </h2>
            <div className="flex gap-x-6 lg:gap-x-10 mb-12 ">
              <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <motion.div
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.8 }}
                className="text-[40px] mb-2 text-[#3FA0EF]">
                  {inView ? "Rewards*" : null}
                </motion.div>
                <div className="text-sm">
                  Get rewarded with crypto and NFT raffles for interacting with your favorite creators.
                </div>
                <div className="text-[8px] mt-4">
                  * Rewards to be decided. Snapshot for rewards taken from moment of contract inception.
                </div>
              </div>
              {/* <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <motion.div
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.8 }}
                className="text-[40px] mb-2">
                  {inView ? "" : null}
                </motion.div>
                <div className="text-sm">
                  Instant processing of creator payments.
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:items-center">
            <Image src="/male1.jpg" alt="aboutImage" width={400} height={400}
              className="max-w-[400px] lg:max-w-[482px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;