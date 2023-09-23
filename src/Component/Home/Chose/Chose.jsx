import React from "react";
import Content from "../../Content";
import { GiBrain, GiNotebook, GiSkills } from "react-icons/gi";
import Title from "../../Design/Title";

const Chose = () => {
  return (
    <Content>
      <section className=" text-white  rounded-lg overflow-y-hidden">
        <div className="">
          <div className="" data-aos="fade-up">
            <Title mainTitle={'Why chose me'}/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-4xl mx-auto">
            <div
              className={`bg-[#011E30] rounded-lg p-6 space-y-3`}
              data-aos="fade-up"
            >
              <div className={`text-3xl !mb-5`}>
                <GiSkills />
              </div>
              <h2 className={`font-bold text-lg`}>Enhance Personal Skill</h2>
              <p>
                Equip learners with a wide range of knowledge for education
                purpose.
              </p>
            </div>
            <div
              className={`bg-[#011E30] rounded-lg p-6 space-y-3`}
              data-aos="fade-up"
            >
              <div className={`text-3xl !mb-5`}>
                <GiBrain />
              </div>
              <h2 className={`font-bold text-lg`}>Sufficient Knowledge</h2>
              <p>
                Study keeps your brain growing because everyone know that we
                cannot reach the top of knowledge.
              </p>
            </div>
            <div
              className={`bg-[#011E30] rounded-lg p-6 space-y-3`}
              data-aos="fade-up"
            >
              <div className={`text-3xl !mb-5`}>
                <GiNotebook />
              </div>
              <h2 className={`font-bold text-lg`}>Self Learning</h2>
              <p>
                You can learn anytime from anywhere, so, you control your study
                with all our tools & courses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default Chose;
