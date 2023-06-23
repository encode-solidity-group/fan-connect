import React from 'react';
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
    <section className="min-h-[85vh] lg:min-h-75 flex items-center md:px-24 xs:px-0" ref={ref}>
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
              className="text-[55px] leading-[0.8] lg:text-[100px] mb-6 text-[#4396bd]">
              <span>CREATORS</span>
            </motion.h1>
            <h2 className="mb-6">
              Fan Connect is a platform for creators to share their context with their community. As a network for creators, promoting interaction between fans and creators.
            </h2>
            <h3 className="mb-6">
              Create a profile, create a community, get paid immediately in crypto. No payment waits, no fees.
            </h3>
            <div className="flex gap-x-6 lg:gap-x-10 mb-12 ">
              <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <motion.div
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.8 }}
                className="text-[40px] mb-2 text-[#4396bd]">
                  {inView ? "0%" : null}
                </motion.div>
                <div className="text-sm">
                  Fees for your first 50 fans.
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <motion.div
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.8 }}
                className="text-[40px] mb-2 text-[#4396bd]">
                  {inView ? "Quick" : null}
                </motion.div>
                <div className="text-sm">
                  Instant processing of creator payments.
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:items-center ">
            <Image src="/woman2.jpg" alt="aboutImage" width={400} height={400}
              className="max-w-[400px] lg:max-w-[482px] h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;