import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../Redux/Class/ClassSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";

const Favorite = () => {
  const { isLoading, class: classData } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);
  const FavoriteDataRaw = localStorage.getItem("favoriteClass");
  const FavoriteData = FavoriteDataRaw ? JSON.parse(FavoriteDataRaw) : [];
  const favoriteClasses = classData.filter((data) =>
    FavoriteData.includes(data._id)
  );
//   console.log(favoriteClasses);
  return (
    <div>
      <div className="pt-16  w-2/3 mx-auto">
        <div className="p-6  sm:p-10 text-gray-100">
          <h2 className="text-xl font-semibold">Your Favorite List : {favoriteClasses.length}</h2>
          {favoriteClasses.map((classes) => (
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
                            className="flex gap-1 items-center px-2 py-1 pl-2"
                          >
                            <FaCartPlus className="w-4 h-4 fill-current" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
