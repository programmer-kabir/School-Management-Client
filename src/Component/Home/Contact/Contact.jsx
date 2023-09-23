import React, { useRef, useState } from "react";
import img from "../../../assets/Image/doodle.svg";
import Content from "../../Content";
import Title from "../../Design/Title";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const isFormFilled = email !== '' && message !== '' && name !== '';
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4i6e9en",
        "template_wqq3l3o",
        form.current,
        "jN1OoaI7XqGtsW1L1"
      )
      .then(
        (result) => {
          if(result){
            Swal.fire({
              title: 'Yah!! Your message Submit',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            form.current.reset();
          }
        },
        (error) => {}
      );
  };
  return (
      <Content className="">
        <Title mainTitle={"Let's talk!"}/>
    <section className="px-8  py-10 rounded-lg md:px-12 lg:px-16 bg-gray-800">
        <div className="grid grid-cols-1 gap-16 items-center mx-auto justify-center md:grid-cols-2 ">
          <div className="">
            <img src={img} alt="" className="h-52 mx-auto md:h-1/3" />
          </div>
          <form  ref={form}
                onSubmit={sendEmail} novalidate="" className="space-y-6">
            <div>
              <label for="name" className="text-sm text-gray-50 font-semibold outline-none border-none">
                Full name
              </label>
              <input
                id="name"
                onChange={e => setName(e?.target?.value)}
                name="from_name"
                type="text"
                placeholder=""
                className="w-full outline-none border-none p-3 rounded bg-gray-50  text-xl"
              />
            </div>
            <div>
              <label for="email" className="text-sm  font-semibold text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                name="from_email"
                className="w-full p-3 rounded text-xl outline-none border-none"
              />
            </div>
            <div>
              <label for="message" className="text-sm text-white font-semibold">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                name="message"
                onChange={e => setMessage(e.target.value)}
                className="w-full outline-none border-none p-3 rounded  text-xl bg-gray-50"
              ></textarea>
            </div>
            <button
              type="submit"
              value="Send"
              disabled={!isFormFilled}
              className={`fromButton  ${isFormFilled ? 'bg-blue-500 border-2 border-cyan-700' : 'bg-gray-500 pointer-events-none'}`}
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
