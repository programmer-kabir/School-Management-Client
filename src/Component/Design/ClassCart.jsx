import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const ClassCart = ({ Class }) => {
  // console.log(link);
  return (
    <div>
      <section className="flex flex-col h-[365px] border border-cyan-600 rounded-lg px-1 py-1">
        <article className="mx-auto relative flex-grow">
          <div className="overflow-hidden rounded-lg">
            <img
              className="w-full rounded-lg h-[200px] transform hover:scale-110 duration-200"
              src={Class?.courseImage}
              alt="CourseImage"
            />
          </div>

          <div className="pr-5 text-gray-100 pt-2">
            <h2 className="text-base font-semibold">{Class?.courseName}</h2>
            <p className="font-semibold py-1">
              Enroll Student: {Class?.enrollStudents}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <AiFillDollarCircle className="w-5 h-5" />
                <p className="font-medium">${Class?.price}</p>
              </div>
              <div>
                <Rating
                  readonly
                  className="text-black"
                  placeholderRating={Class?.ratting}
                  emptySymbol={<FaRegStar color="yellow"/>}
                  placeholderSymbol={<FaStar color="yellow" />}
                  fullSymbol={<FaStar color="yellow" />}
                />
              </div>
            </div>
          </div>
        </article>
        <div className="mt-auto">
          <Link to={Class?._id}>
            <button  disabled={Class?.sits === 0} className="secondary-btn w-full text-center justify-center flex items-center gap-1">
              <MdDescription size={20} />
              Details
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClassCart;
