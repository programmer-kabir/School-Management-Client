import React from "react";
import img from "../../../assets/Image/doodle.svg";
import Content from "../../Content";
import Title from "../../Design/Title";
const Contact = () => {
  return (
      <Content>
        <Title mainTitle={"Let's talk!"}/>
    <section className="px-8 py-10 rounded-lg md:px-12 lg:px-16 bg-gray-300">
        <div className="grid grid-cols-1 gap-16 items-center mx-auto justify-center md:grid-cols-2 ">
          <div className="">
            <img src={img} alt="" className="h-52 mx-auto md:h-1/3" />
          </div>
          <form novalidate="" className="space-y-6">
            <div>
              <label for="name" className="text-sm">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                className="w-full p-3 rounded bg-gray-800 text-white text-xl"
              />
            </div>
            <div>
              <label for="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 rounded text-white text-xl bg-gray-800"
              />
            </div>
            <div>
              <label for="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                className="w-full p-3 rounded text-white text-xl bg-gray-800"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 text-sm font-bold  uppercase rounded dark:bg-cyan-400 dark:text-gray-900"
            >
              Send Message
            </button>
          </form>
        </div>
    </section>
      </Content>
  );
};

export default Contact;
