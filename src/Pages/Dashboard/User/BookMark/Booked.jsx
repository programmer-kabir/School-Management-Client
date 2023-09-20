import React, { useEffect, useState } from "react";
import useBookMark from "../../../../Component/Hooks/useBookMark";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../../../Redux/Class/ClassSlice";
import Content from "../../../../Component/Content";
import Loader from "../../../../Component/Loader/Loader";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import ClassCart from "../../../../Component/Design/ClassCart";
import { Link } from "react-router-dom";

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
    <div>
      <Content>
        <div className="pb-10 pt-2 grid lg:grid-cols-3 md:grid-cols-3  grid-cols-1 gap-5">
          {filteredClasses.map((Class) => (
            <ClassCart Class={Class} />
          ))}
    
        </div>
      </Content>
    </div>
  );
};

export default Booked;
