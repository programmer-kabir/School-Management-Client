import React, { useEffect } from "react";
import Content from "../../Content";
import Title from "../../Design/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../../../Pages/Redux/Class/ClassSlice";
import { AiFillDollarCircle } from "react-icons/ai";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import Loader from "../../Loader/Loader";

const TopClass = () => {
  const {
    isLoading,
    class: classData,
    review,
  } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);
  const first10ClassData = classData.slice(3, 11);
  console.log(first10ClassData);
  return (
    <Content>
      <Title
        mainTitle={"Our Top Class"}
        subTitle={
          "We think we will provide our best classes and best instructors"
        }
      />
      <div className="grid grid-cols-4 gap-5">
        {isLoading && <Loader />}
        {first10ClassData.map((data) => (
          <div className="">
            <div className=" rounded-lg shadow-md bg-[#011E30] text-gray-100">
              <div className="space-y-4 h-[380px]">
                <div className="space-y-2">
                  <img
                    src={data.courseImage}
                    alt=""
                    className="block object-cover w-full rounded-t-lg h-56 bg-gray-500"
                  />
                  <div className="flex px-4 items-center justify-between">
                    <div className="flex gap-2">
                      <AiFillDollarCircle className="w-5 h-5" />
                      <p className="font-medium">${data?.price}</p>
                    </div>
                    <div>
                      <Rating
                        readonly
                        className="text-black"
                        placeholderRating={data?.ratting}
                        emptySymbol={<FaRegStar color="yellow" />}
                        placeholderSymbol={<FaStar color="yellow" />}
                        fullSymbol={<FaStar color="yellow" />}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 px-4">
                  <a rel="noopener noreferrer" href="#" className="block">
                    <h3 className="text-xl font-semibold text-white">
                      {data.courseName}
                    </h3>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default TopClass;
