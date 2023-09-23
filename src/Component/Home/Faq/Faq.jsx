import React from "react";
import Content from "../../Content";
import Title from "../../Design/Title";

const Faq = () => {
  return (
    <Content>
      <section className="bg-[#011E30] pt-10 text-gray-100 rounded-lg">
        <Title
          mainTitle={"Frequently Asked Questions"}
          subTitle={
            "Sagittis tempor donec id vestibulum viverra. Neque condimentum primis orci at lacus amet bibendum."
          }
        />
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8"> 
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
            <details>
              <summary className="py-2 outline-none font-semibold text-xl cursor-pointer focus:underline">
                Optio maiores eligendi molestiae totam dolores similique?
              </summary>
              <div className="px-4 pb-4">
                <p >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  neque in fugiat magni, quas animi enim veritatis deleniti ex.
                  Impedit.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 font-semibold text-xl outline-none cursor-pointer focus:underline">
                Modi dolorem veritatis culpa quos consequuntur beatae itaque
                excepturi perspiciatis?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  aspernatur quae, eos explicabo odit minima libero veniam
                  similique quibusdam doloribus facilis ipsa accusantium vel
                  maiores corrupti! Libero voluptate a doloribus?
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 font-semibold text-xl outline-none cursor-pointer focus:underline">
                Magni reprehenderit possimus debitis?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  voluptates aspernatur dolores in consequatur doloremque
                  inventore reprehenderit, consequuntur perspiciatis architecto.
                </p>
                <p>
                  Sed consectetur quod tenetur! Voluptatibus culpa incidunt
                  veritatis velit quasi cupiditate unde eaque! Iure,
                  voluptatibus autem eaque unde possimus quae.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default Faq;
