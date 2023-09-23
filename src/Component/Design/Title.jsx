import React from "react";
import underline from "../../assets/Image/underline.png";
const Title = ({ mainTitle, subTitle }) => {
  return (
    <div className="text-center text-white space-y-4 pb-6 ">
      <h2 className="text-4xl font-semibold">{mainTitle}</h2>
      <p className="px-16  text-medium text-base font-medium ">{subTitle}</p>
      {/* <img className="mx-auto w-1/6" src={underline} alt="" /> */}
    </div>
  );
};

export default Title;
