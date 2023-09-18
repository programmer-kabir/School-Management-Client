import React from "react";
import { Link } from "react-router-dom";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="">
      <footer className="bg-gray-800">
        <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8">
          <div className="mt-8 grid  justify-center grid-cols-2 lg:grid-cols-5 gap-8  lg:mt-0  lg:gap-y-16">
            <div className="">
              <p className="font-semibold text-base text-white">Services</p>
              <div className="mt-6 space-y-4 text-sm flex flex-col">
                <Link className="text-gray-400">1on1 Coaching</Link>

                <Link className="text-gray-400">Company Review</Link>

                <Link className="text-gray-400">Accounts Review</Link>

                <Link className="text-gray-400">HR Consulting</Link>

                <Link className="text-gray-400">SEO Optimisation</Link>
              </div>
            </div>

            <div className="">
              <p className="font-semibold text-base text-white">Company</p>

              <div className="mt-6 space-y-4 text-sm flex flex-col">
                <Link className="text-gray-400">About</Link>

                <Link className="text-gray-400"> Meet the Team</Link>

                <Link className="text-gray-400"> Accounts Review</Link>
              </div>
            </div>

            <div className="">
              <p className="font-semibold text-base text-white">Helpful Links</p>

              <div className="mt-6   text-sm flex flex-col space-y-4">
                <Link className="text-gray-400"> Contact</Link>

                <Link className="text-gray-400"> FAQs</Link>

                <Link className="text-gray-400"> Live Chat</Link>
              </div>
            </div>

            <div className="">
              <p className="font-semibold text-base text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="text-gray-400">
                  <Link> Accessibility</Link>
                </li>

                <li className="text-gray-400">
                  <Link>Returns Policy</Link>
                </li>

                <li className="text-gray-400">
                  <Link>Refund Policy</Link>
                </li>

                <li className="text-gray-400">
                  <Link> Hiring Statistics</Link>
                </li>
              </ul>
            </div>

            <div className="">
              <p className="font-semibold text-base text-white">Downloads</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="text-gray-400">
                  <Link> Marketing Calendar</Link>
                </li>

                <li className="text-gray-400">
                  <Link> SEO Info graphics</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className=" flex justify-center gap-5 mt-10 md:mt-0">
            <FaFacebook color="gray" size={21} />

            <FaInstagram color="gray" size={21} />

            <FaTwitter color="gray" size={21} />

            <FaGithub color="gray" size={21} />

            <FaDribbble color="gray" size={21} />
          </div>
          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-sm text-gray-400">
                &copy; 2023. Company Name. All rights reserved.
              </p>

              <div className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                <Link className="text-gray-400 font-medium">
                  Terms & Conditions
                </Link>

                <Link className="text-gray-400 font-medium">
                  Privacy Policy
                </Link>

                <Link className="text-gray-400 font-medium">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
