import React, { useEffect, useState } from "react";
import useBookMark from "../../../../Component/Hooks/useBookMark";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../../../Redux/Class/ClassSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import useAuth from "../../../../Component/Hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment/Payment";
import { useQuery } from "@tanstack/react-query";
const stripePromise = loadStripe(import.meta.env.VITE_PK_KEY);
const Booked = () => {
  const [booked, refetch] = useBookMark();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const bookMarkIds = booked.map((book) => book.id);
  const { isLoading, class: classData } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);
  //   const excludedClasses = classData.filter((classItem) =>
  //     !bookMarkIds.includes(classItem._id)
  // );

  const filteredClasses = classData.filter((classItem) =>
    bookMarkIds.includes(classItem._id)
  );
  console.log(filteredClasses);
  const price = selectedClass?.price;

  const bookedId = booked.find((i) => i.id === selectedClass?._id);
  console.log(bookedId?._id);
  const {
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
  const getMatchingIDs = () => {
    let matchingIDs = [];

    enrolled.forEach((payment) => {
      if (
        payment.bookedId &&
        filteredClasses.some((bookmark) => bookmark._id === payment.bookedId.id)
      ) {
        matchingIDs.push(payment.bookedId.id);
      }
    });

    return matchingIDs;
  };

  const result = getMatchingIDs();
  console.log(result);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(
        `${import.meta.env.VITE_LOCALHOST_KEY}/booked?userEmail=${
          user?.email
        }/${id}`,
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN",
          },
        }
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePaymentSuccess = () => {
    setShowModal(false);
  };
  console.log(filteredClasses);
  return (
    <div className="pt-16 w-full ">
      <div className="px-3 md:px-6 pt-5  sm:p-10 text-gray-100">
        {filteredClasses.length === 0 && (
          <div className="flex mx-auto gap-2 items-center bg-[#10202B] border border-teal-100 w-1/2 px-5 text-center py-5 rounded-xl">
            <AiOutlineExclamationCircle />{" "}
            <span>You did not book any course yet!</span>
          </div>
        )}
        {filteredClasses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">
              Your cart : {filteredClasses.length}
            </h2>
            {filteredClasses.map((classes) => (
              <div key={classes._id}>
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
                              onClick={() => handleDelete(classes._id)}
                              className="flex items-center px-2 py-1 pl-0 space-x-1"
                            >
                              <RiDeleteBin6Line className="w-4 h-4 fill-current" />
                              <span>Remove</span>
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
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClass(classes);
                        setShowModal(true);
                      }}
                      className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                      disabled={result.includes(classes._id)}
                    >
                      <span className="sr-only sm:not-sr-only">
                        Continue to
                      </span>
                      Checkout
                    </button>
                  </div>
                  {showModal && (
                    <div className="fixed top-0 text-black left-0 w-full bottom-0 z-50 h-full flex items-center justify-center ">
                      <div className="mx-16">
                        <section className="relative py-10  sm:py-16 lg:py-24">
                          <div className="relative lg:w-[1000px] w-[350px] px-4 mx-auto sm:px-0">
                            <div className="overflow-hidden bg-white rounded-md shadow-md">
                              <div className="px-4 py-6 sm:px-8 sm:py-7">
                                <div className="text-center flex items-center justify-between">
                                  <h2 className="text-3xl font-bold text-gray-900">
                                    Check Out Page...
                                  </h2>
                                  <button onClick={() => setShowModal(false)}>
                                    <FaArrowRightFromBracket size={25} />
                                  </button>
                                </div>
                                <div>
                                  <div className="w-full">
                                    <Elements stripe={stripePromise}>
                                      <Payment
                                        bookedId={bookedId}
                                        price={price}
                                        onPaymentSuccess={handlePaymentSuccess}
                                        selectedClass={selectedClass}
                                      />
                                    </Elements>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booked;
