import React, { useEffect, useState } from "react";
import useBookMark from "../../../../Component/Hooks/useBookMark";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../../../Redux/Class/ClassSlice";
import Content from "../../../../Component/Content";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import Loader from "../../../../Component/Loader/Loader";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import ClassCart from "../../../../Component/Design/ClassCart";
import { Link } from "react-router-dom";
import BookMarkDetails from "../../../../Component/Dashboard/BookMark/BookMarkDetails";

const Booked = () => {
  const [booked] = useBookMark();
  // console.log(bookmark);
  const bookMarkIds = booked.map((book) => book.id);
  const { isLoading, class: classData } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);
  const filteredClasses = classData.filter((classItem) =>
    bookMarkIds.includes(classItem._id)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const renderDescription = () => {
    if (!filteredClasses?.courseDetails) return;

    const words = filteredClasses.courseDetails.split(" ");
    if (words.length <= 25) return filteredClasses.courseDetails;

    if (isExpanded) {
      return filteredClasses.courseDetails;
    }

    return `${words.slice(0, 25).join(" ")}`;
  };
  return (
    <div className="pt-16 w-full ">
      <div className="p-6  sm:p-10 dark:bg-gray-800 dark:text-gray-100">
        <h2 className="text-xl font-semibold">Your cart</h2>
        {filteredClasses.map((classes) => (
          <div>
            <div className="flex flex-col space-y-4 ">
              <ul className="flex flex-col divide-y divide-gray-700">
                <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
                  <div className="flex w-full space-x-2 sm:space-x-4">
                    <img
                      className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                      src={classes?.courseImage}
                      alt="Polaroid camera"
                    />
                    <div className="flex flex-col justify-between w-full pb-4">
                      <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leadi sm:pr-8">
                            {classes?.courseName}
                          </h3>
                          <p className="text-sm dark:text-gray-400">
                            {classes?.instructorEmail}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            ${classes?.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-sm divide-x">
                        <button
                          type="button"
                          className="flex items-center px-2 py-1 pl-0 space-x-1"
                        >
                          <RiDeleteBin6Line className="w-4 h-4 fill-current" />
                          <span>Remove</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center px-2 py-1 space-x-1"
                        >
                          <FiHeart className="w-4 h-4" />
                          <span>Add to favorites</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="space-y-1 text-right">
                <p>
                  Total amount:
                  <span className="font-semibold">${classes?.price}</span>
                </p>
                <p className="text-sm dark:text-gray-400">
                  Not including taxes and shipping costs
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border rounded-md dark:border-violet-400"
                >
                  Back
                  <span className="sr-only sm:not-sr-only"> to shop</span>
                </button>
                <Link to={'payment'}>
                <button
                  type="button"
                  className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                >
                  <span className="sr-only sm:not-sr-only">Continue to</span>
                  Checkout
                </button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booked;
