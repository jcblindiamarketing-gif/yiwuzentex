"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Carousel.module.css";

export default function Carousel({
  data = [],
  renderSlide,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  delay = 3000,
  leftArrowPosition = "",
  rightArrowPosition = "",
  showThumbnails = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  //Add auto play

  const intervalRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      }, delay);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [data, data.length, delay]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.slide}
          >
            {renderSlide(data[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>

        {showArrows && (
          <>
            <button
              className={`${styles.arrow}  ${leftArrowPosition ? leftArrowPosition : styles.left} `}
              onClick={prev}
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${rightArrowPosition ? rightArrowPosition : styles.right}`}
              onClick={next}
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && (
        <div className={styles.dots}>
          {data.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {showThumbnails && (
        <div className="flex gap-2 mt-5">
          {data.map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={data[index]?.asset?.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-[100px] h-[100px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
