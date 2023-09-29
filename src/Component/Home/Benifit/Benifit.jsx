import React from "react";
import { MdContentCopy, MdDashboard, MdPeopleAlt } from "react-icons/md";

import imgEducation from "../../../assets/Image/education-2e1758d3.png";
import Content from "../../Content";
const Benefit = () => {
  return (
    <Content>
      <div className="bg-[#011E30] rounded-lg py-10 md:px-16 px-9 md:flex flex-row-reverse items-center justify-between">
        <div>
          <img src={imgEducation} className="lg:w-2/3 mx-auto" alt="" />
        </div>
        <div className="pt-5 md:pt-0">
          <button className="bg-cyan-500 px-5 py-2 rounded-full  text-white">
            Benefit
          </button>
          <div className={`space-y-3 mt-3`}>
            <div className={`flex items-center space-x-2`}>
              <span
                className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm"
              >
                <MdContentCopy size={20} />
              </span>
              <p className={`text-white`}>
                TA’s and presenters can be moved to the front of the class.
              </p>
            </div>
            <div className={`flex items-center space-x-2`}>
              <span
                className={`inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm`}
              >
                <MdPeopleAlt size={20} />
              </span>
              <p className={`text-white`}>
                Teachers can easily see all students and class data at one time.
              </p>
            </div>
            <div className={`flex items-center space-x-2`}>
              <span
                className={`inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm`}
              >
                <MdDashboard size={20} />
              </span>
              <p className={`text-white`}>
                Teachers don’t get lost in the grid view and have a dedicated
                Podium space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Benefit;
