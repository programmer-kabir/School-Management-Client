import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsSlice, {
  fetchReviews,
} from "../../../Pages/Redux/Reviews/ReviewsSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Content from "../../Content";
import Loader from "../../Loader/Loader";
import Title from "../../Design/Title";
const Reviews = () => {
  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const { isLoading, reviews, error } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  const toggleFullReview = (id) => {
    if (expandedReviewId === id) {
      setExpandedReviewId(null);
    } else {
      setExpandedReviewId(id);
    }
  };
  const getShortenedReview = (text) => {
    if (typeof text !== "string") return ""; // Handle non-string values

    const words = text.split(" ");
    if (words.length <= 15) return text;

    const shortenedWords = words.slice(0, 15);
    return `${shortenedWords.join(" ")}... `;
  };

  // console.log(reviews);
  return (
    <Content>
      <section className="">
        <Title
          mainTitle={"Student Says Our Course"}
          subTitle={
            "The course pacing could be improved. Some modules seemed rushed and might benefit from being spread out. Additionally, while informative, the reading materials were occasionally dense and could use summarization."
          }
        />

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {error && <Loader />}
          {reviews &&
            reviews.map((review) => (
              <SwiperSlide key={review._id} className="mb-10   ">
                <div className="lex  flex-col w-[392px]  p-4 mx-auto divide-y rounded-md divide-gray-700 bg-[#011E30] text-gray-100">
                  <div className="flex justify-between py-4">
                    <div className="flex space-x-4">
                      <div className="w-12 h-12">
                        <img
                          src={review?.image}
                          alt=""
                          className=" rounded-full bg-gray-500"
                        />
                      </div>
                      <div className="text-start ">
                        <h4 className="font-bold">{review?.name}</h4>
                        <span className="text-xs text-gray-400">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-500">
                      {/* <FaStar /> */}
                      <span className="text-xl font-bold">
                      <Rating
                      readonly
                      className="text-black"
                      placeholderRating={review.ratting}
                      emptySymbol={<FaRegStar color="yellow"/>}
                      placeholderSymbol={<FaStar color="yellow" />}
                      fullSymbol={<FaStar color="yellow" />}
                    />
                      </span>
                    </div>
                  </div>
                  <div className=" pt-2 space-y-2 text-gray-400">
                  <p className="text-base text-start">
                      {review?.review &&
                      typeof review.review === "string" &&
                      review.review.split(" ").length > 15 &&
                      expandedReviewId !== review._id ? (
                        <>
                          {getShortenedReview(review.review)}
                          <button
                            className="text-blue-500 ml-2"
                            onClick={() => toggleFullReview(review._id)}
                          >
                            Read more
                          </button>
                        </>
                      ) : (
                        <>
                          {review?.review}
                          {review.review.split(" ").length > 15 && (
                            <button
                              className="text-blue-500 ml-2"
                              onClick={() => toggleFullReview(review._id)}
                            >
                              See less
                            </button>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </Content>
  );
};

export default Reviews;
