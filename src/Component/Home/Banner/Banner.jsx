import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
// 
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
const slidesData = [
  {
    image: "https://i.ibb.co/mSS1wW7/First.jpg",
    title: "Dive into the World of Coding!",
    description:
      "Explore algorithms and data structures, Ignite your passion for digital creation.",
  },
  {
    image: "https://i.ibb.co/0qwB3QY/Second.jpg",
    title: "Embracing Technologies!",
    description:
      "Navigating the digital frontier, harnessing the power and potential of tomorrow's innovations.",
  },
  {
    image: "https://i.ibb.co/7pPPS0H/Thired.jpg",
    title: "Best Practices Development!",
    description:
      "Elevating code quality through meticulous design, and fostering collaboration for breakthroughs.",
  },
  {
    image: "https://i.ibb.co/TkFxVp7/Fourth.jpg",
    title: "Exploring the Programming!",
    description:
      "Delving deep into intricate algorithms and data structures, and refining skills performance.",
  },
  {
    image: "https://i.ibb.co/JQjxWYh/Five.jpg",
    title: "Mastering Programming !",
    description:
      "Delving deep into intricate algorithms and data structures, and refining skills performance.",
  },
  {
    image: "https://i.ibb.co/w7pYpsG/six.jpg",
    title: "Crafting Solutions for Results!",
    description:
      " Meticulously engineering software excellence, unleashing the potential of innovation and efficiency.",
  },
];
const Banner = () => {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {slidesData.map((slide, index) => (
        <>
          <SwiperSlide key={index} className="relative">
            <img src={slide.image} alt={slide.title} />
            <div className="absolute space-y-2 w-11/12 mx-auto p-7 text-start text-white md:pr-[700px]">
              <h2 className="text-2xl md:text-3xl lg:text-4xl">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base lg:text-lg">
                {slide.description}
              </p>
              <button className="primary-btn text-white">Details</button>
            </div>
          </SwiperSlide>

          <div className="absolute bottom-0 w-full z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g>
                <use xlinkHref="#gentle-wave" x="50" y="0" fill="#011e30" />
              </g>
              <g>
                <use xlinkHref="#gentle-wave" x="50" y="6" fill="#1d313e" />
              </g>
            </svg>
          </div>
        </>
      ))}
    </Swiper>

    </div>
  );
};

export default Banner;
