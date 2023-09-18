import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
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
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {slidesData.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.image} alt={slide.title} />
          <div className="absolute space-y-2 w-11/12 mx-auto p-7 text-start text-white md:pr-[700px]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl">{slide.title}</h2>
            <p className="text-sm md:text-base lg:text-lg">
              {slide.description}
            </p>
            <button className="primary-btn text-white">Details</button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
