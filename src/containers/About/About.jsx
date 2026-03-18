"use client";
import images from "@/assets";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Achievements } from "@/constants/data";
import Link from "next/link";

const extractNumericAndSuffix = (countStr) => {
  const match = countStr.match(/^(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return { number: 0, suffix: "" };
  return { number: parseFloat(match[1]), suffix: match[2] };
};

const AchievmentCard = ({ title, count }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayCount, setDisplayCount] = useState(0);

  const { number, suffix } = extractNumericAndSuffix(count);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, number, {
        duration: 2,
        onUpdate: (latest) => {
          setDisplayCount(Math.floor(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, motionValue, number]);

  return (
    <aside
      ref={ref}
      className="flex flex-col justify-between p-4 border border-gray-400"
    >
      <h2 className="text-6xl min-w-[180px] font-semibold accent">
        {displayCount}
        {suffix}
      </h2>
      <p className="text-lg text-[#3F3F3F]">{title}</p>
    </aside>
  );
};

function About() {
  return (
    <section className="">
      <div className="bg-secondary  max-md:h-auto relative py-12  max-md:gap-4 max-md:pb-8">
        <h2 className="accent-sec text-5xl text-center  leading-14 max-md:leading-snug max-md:text-3xl max-md:w-full font-medium ">
          Founded with a vision to simplify international trade
        </h2>
      </div>

      <div className="app__container mx-auto flex gap-9 max-md:mt-8 mt-7 max-md:flex-col">
        <div className="w-2/3 relative max-md:w-full">
          <Image src={images.HomeCollage} alt="About Header" className="" />
          {/* <Image src={images.HomeCollage} alt="About Header" className="md:hidden " /> */}
        </div>

        <div className="w-full relative max-md:w-full  ">
          <p className="grey-variant text-xl w-[85%] max-md:w-full mb-5">
            Yiwu ZENTREX is a trusted brand committed to serving the needs of
            global buyers. Founded with a vision to simplify international
            trade, Yiwu ZENTREX has evolved to meet the ever-changing demands of
            the global market. With a strong foundation built on expertise,
            trust, and innovation, we empower businesses by providing
            high-quality products that drive efficiency and growth.
          </p>

          <Link
            href={"/services/supply-chain-management"}
            className="bg-accent text-[#484646]  rounded-full cursor-pointer px-4 py-2 font-medium "
          >
            Read More
          </Link>
        </div>

        {/* <div className="w-full flex gap-4 max-md:flex-wrap max-md:justify-center">
          {Achievements.map((achievement, index) => (
            <AchievmentCard
              key={index}
              title={achievement.title}
              count={achievement.count}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default About;
