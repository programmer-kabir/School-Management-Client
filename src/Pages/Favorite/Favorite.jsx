import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../Redux/Class/ClassSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Component/Hooks/useAuth";
import axios from "axios";
import useBookMark from "../../Component/Hooks/useBookMark";
import { AiOutlineExclamationCircle } from "react-icons/ai";
const Favorite = () => {
  const [bookData, refetch] = useBookMark();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
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
  useEffect(() => {
    const rawData = localStorage.getItem("favoriteClass");
    if (rawData) {
      setFavorites(JSON.parse(rawData));
    }
  }, []);
  const isClassBooked = (classId) => {
    return bookData.some((book) => book.id === classId);
  };

  const handleDelete = (id) => {
    const updatedArray = favorites.filter((storedId) => storedId !== id);
    setFavorites(updatedArray); // This will re-render your component
    localStorage.setItem("favoriteClass", JSON.stringify(updatedArray));
    toast.success("Successfully deleted!");
  };

  const handleAddToCart = (id) => {
    console.log(id);
    if (!user) {
      Swal.fire({
        title: "Please Login now",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      const saveData = { id: id, userEmail: user?.email };

      axios
        .post(`${import.meta.env.VITE_LOCALHOST_KEY}/booked`, { saveData })
        .then((response) => {
          toast.success("Successfully Added!");
          const updatedFavorites = favorites.filter(
            (storedId) => storedId !== id
          );
          setFavorites(updatedFavorites);
          localStorage.setItem(
            "favoriteClass",
            JSON.stringify(updatedFavorites)
          );
        });
      refetch();
    }
  };
  return (
    <div>
      <div className="pt-16  md:w-2/3 mx-auto">
        <div className="p-6  sm:p-10 text-gray-100">
          {favoriteClasses.length === 0 && (
            <div className="flex mx-auto gap-2 items-center bg-[#10202B] border border-teal-100 md:w-1/2 px-5 text-center py-5 rounded-xl">
              <AiOutlineExclamationCircle />{" "}
              <span>You did not book any course yet!</span>
            </div>
          )}
          {favoriteClasses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">
                Your Favorite List : {favoriteClasses.length}
              </h2>
              {favoriteClasses.map((classes) => (
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
                                onClick={() => handleDelete(classes._id)}
                                type="button"
                                className="flex items-center px-2 py-1 pl-0 space-x-1"
                              >
                                <RiDeleteBin6Line className="w-4 h-4 fill-current" />
                                <span>Remove</span>
                              </button>
                              <button
                                onClick={() => handleAddToCart(classes._id)}
                                type="button"
                                disabled={isClassBooked(classes._id)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
