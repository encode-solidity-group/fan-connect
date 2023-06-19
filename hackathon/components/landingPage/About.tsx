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
    <section className="min-h-[85vh] lg:min-h-75 flex items-center px-24" ref={ref}>
      <div className="containter mx-auto">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-2 text-center lg:text-left">
            <h2 className="mb-6">
              Fan Connect is a platform for creators to share their context with their community. As a network for creators, promoting interaction between fans and creators.
            </h2>
            <h3 className="mb-6">
              Create a profile, create a community, get paid immediately in crypto. No payment waits, no fees.
            </h3>
            <div className="flex gap-x-6 lg:gap-x-10 mb-12 ">
              <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <div className="text-[40px] mb-2">
                  {inView ? "0%" : null}
                </div>
                <div className="text-sm">
                  Fees for your first 50 fans.
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left sm:justify-evenly">
                <div className="text-[40px] mb-2">
                  {inView ? "Quick" : null}
                </div>
                <div className="text-sm">
                  Instant processing of creator payments.
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center mix-blend-lighten lg:items-center glassMorph">
            <Image src="/otherpic.jpg" alt="aboutImage" width={400} height={400}
              className="max-w-[400px] lg:max-w-[482px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;