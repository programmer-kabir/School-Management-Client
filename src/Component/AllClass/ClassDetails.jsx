import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { fetchUClass } from "../../Pages/Redux/Class/ClassSlice";
import Content from "../Content";
import Rating from "react-rating";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaBookmark, FaCartPlus, FaRegStar, FaStar } from "react-icons/fa";
import { fetchInstructor } from "../../Pages/Redux/Instructor/InstructorSlice";
import Loader from "../Loader/Loader";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useBookMark from "../Hooks/useBookMark";
import { FiHeart } from "react-icons/fi";

const ClassDetails = () => {
  const [bookData, refetch] = useBookMark();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteClass")) || [];
    setFavorites(storedFavorites);
  }, []);

  // console.log(bookData);
  const { id } = useParams();
  const isBooked = bookData.some((book) => String(book.id) === String(id));
  //
  const FavoriteDataRaw = localStorage.getItem("favoriteClass");
  const FavoriteData = FavoriteDataRaw ? JSON.parse(FavoriteDataRaw) : [];
  const isFavorite = favorites.includes(id);
  console.log(isFavorite);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoading, class: classData } = useSelector((state) => state.class);
  const { instructor } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
    dispatch(fetchInstructor());
  }, []);
  const data = classData.find((classes) => classes._id === id);
  const classEmail = data?.instructorEmail;
  const instructorData = instructor.find(
    (instructors) => instructors.instructorEmail === classEmail
  );
  // console.log(instructorData);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const renderDescription = () => {
    if (!data?.courseDetails) return;

    const words = data.courseDetails.split(" ");
    if (words.length <= 25) return data.courseDetails;

    if (isExpanded) {
      return data.courseDetails;
    }

    return `${words.slice(0, 25).join(" ")}`;
  };
  const handleBooked = (id) => {
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
      // console.log(saveData);
      axios
        .post(`${import.meta.env.VITE_LOCALHOST_KEY}/booked`, { saveData })
        .then((response) => {
          toast.success("Successfully Added!");
        });
      refetch();
    }
  };

  const handleAddToFavorite = (id) => {
    let favoriteClasses = [...favorites];

    if (!favoriteClasses.includes(id)) {
      favoriteClasses.push(id);
    }

    localStorage.setItem("favoriteClass", JSON.stringify(favoriteClasses));
    setFavorites(favoriteClasses);
    toast.success('Added to favorites!');
  };

  return (
    <Content>
      <div className="pb-10 pt-2 text-gray-100">
        <h2 className="text-center text-3xl font-semibold pb-5">
          Course Details: {data?.courseName}
        </h2>
        {isLoading && <Loader />}
        <section className="w-2/3 mx-auto p-10 rounded-lg  border-gray-400 border">
          <div className="overflow-hidden  rounded-lg">
            <img
              className=" w-full rounded-lg h-[200px] transform hover:scale-110 duration-200"
              src={data?.courseImage}
              alt="CourseImage"
            />
          </div>
          {/* Details */}
          <div className="pr-5 pt-6">
            <h2 className="text-2xl font-semibold ">{data?.courseName}</h2>
            <p className="font-semibold py-2">
              Details:
              <span className="font-medium text-justify">
                {renderDescription()}
              </span>
              {data?.courseDetails &&
                data.courseDetails.split(" ").length > 25 && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={handleToggle}
                  >
                    {isExpanded ? "...see less" : "...see more"}
                  </span>
                )}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <AiFillDollarCircle className="w-5 h-5" />
                <p className="font-medium">${data?.price}</p>
              </div>
              <div>
                <Rating
                  readonly
                  className="text-black"
                  placeholderRating={data?.ratting}
                  emptySymbol={<FaRegStar />}
                  placeholderSymbol={<FaStar color="#FFB100" />}
                  fullSymbol={<FaStar color="#FFB100" />}
                />
              </div>
            </div>
            {/* Sits, Available Sits, Enroll Students */}
            <div className="flex pt-2 items-center justify-between">
              <p className="font-semibold text-base">
                All Sits: <span className="font-medium">{data?.sits}</span>
              </p>
              <p className="font-semibold text-base">
                Enroll Students{" "}
                <span className="font-medium">{data?.enrollStudents}</span>
              </p>
            </div>
            {/* Instructor Details */}
            <div className="py-2 space-y-2">
              <p className="font-semibold text-base">
                Instructor Email:{" "}
                <span> {instructorData?.instructorEmail}</span>
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  className="h-12 w-12 rounded-full"
                  src={instructorData?.instructorImage}
                  alt=""
                />
                <p className="font-semibold text-base">
                  Instructor Name:{" "}
                  <span> {instructorData?.instructorName}</span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleBooked(data?._id)}
                  className="secondary-btn flex items-center gap-1 px-5"
                  disabled={isBooked}
                >
                  <FaCartPlus />
                  Add Cart
                </button>
                <button
                  type="button"
                  onClick={() => handleAddToFavorite(data?._id)}
                  className={`flex border border-gray-100 rounded-lg items-center px-2 py-1 space-x-1 ${
                    isFavorite ? "your-additional-styles-for-favorite" : ""
                  }`}
                >
                  <FiHeart
                    className={`w-4 h-4 ${
                      isFavorite ? "text-red-500 fill-current" : ""
                    }`}
                  />
                  <span>Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Content>
  );
};

export default ClassDetails;
