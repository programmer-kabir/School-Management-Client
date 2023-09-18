import React from "react";

const Title = ({ mainTitle, subTitle }) => {
  return (
    <div className="text-center space-y-4 pb-6">
      <h2 className="text-4xl font-semibold">{mainTitle}</h2>
      <p className="px-16 text-medium text-base font-medium">{subTitle}</p>
    </div>
  );
};

export default Title;
