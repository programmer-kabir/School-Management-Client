import React, { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import useAuth from "../../../../Component/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../../../Redux/Class/ClassSlice";
import toast from "react-hot-toast";

const EnrolCourse = () => {
  const { user } = useAuth();

  const {
    refetch,
    data: enrolled = [],
    isLoading: loading,
    isError,
  } = useQuery(["enrolled"], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_LOCALHOST_KEY}/payment?email=${user.email}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
  const { isLoading, class: classData } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);

  const matchedData = enrolled
    .map((payment) => {
      const matchedClass = classData.find(
        (singleClass) =>
          payment.bookedId && payment.bookedId.id === singleClass._id
      );
      return {
        classInfo: matchedClass,
        transactionId: payment.transactionId,
      };
    })
    .filter((item) => item.classInfo);
  console.log(matchedData);
  if (loading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error loading enrolled courses.</div>;
  }
// Copy Id
const copyToClipboard = (transactionId) => {
  navigator.clipboard.writeText(transactionId).then(() => {
    // Notify the user with a toast that the copying was successful
    toast.success("Transaction ID copied to clipboard!");
  }, (err) => {
    // Notify the user with a toast that there was an error
    toast.error("Failed to copy transaction ID!");
  });
};



  return (
    <div className="pt-20">
      <div className="p-6  sm:p-10 text-gray-100">
        {enrolled.length === 0 && (
          <div className="flex mx-auto gap-2 items-center bg-[#10202B] text-white border border-teal-100 w-1/2 px-5 text-center py-5 rounded-xl">
            <AiOutlineExclamationCircle />{" "}
            <span>You did not book any course yet!</span>
          </div>
        )}
        {matchedData.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">
              Your Course : {matchedData.length}
            </h2>
            {matchedData.map((classes) => (
              <div key={classes.classInfo._id}>
                <div className="flex flex-col space-y-4">
                  <ul className="flex flex-col divide-y divide-gray-700">
                    <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                          className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                          src={classes?.classInfo.courseImage}
                          alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="font-semibold  sm:pr-8">
                                {classes?.classInfo.courseName}
                              </h3>
                              <button  onClick={() => copyToClipboard(classes.transactionId)} className="secondary-btn px-3 md:hidden">
                                transaction
                              </button>
                              <p className="font-semibold hidden md:block">
                                Price :{" "}
                                <span className="font-normal">
                                  $ {classes.classInfo.price}
                                </span>
                              </p>
                            </div>
                            <div className="text-right">
                              <button
                                className="secondary-btn px-3 hidden md:block"
                                onClick={() => copyToClipboard(classes.transactionId)}
                              >
                                transaction
                              </button>
                              {/* <p className="font-semibold">
                                Transition Number :{" "}
                                <span className="font-normal">
                                  {classes.transactionId}
                                </span>
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolCourse;
