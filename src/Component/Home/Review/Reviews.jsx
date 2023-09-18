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
    if (words.length <= 20) return text;

    const shortenedWords = words.slice(0, 20);
    return `${shortenedWords.join(" ")}... `;
  };

  // console.log(reviews);
  return (
    <Content>
      <section className="">
        <Title mainTitle={'Student Says Our Course'} subTitle={'The course pacing could be improved. Some modules seemed rushed and might benefit from being spread out. Additionally, while informative, the reading materials were occasionally dense and could use summarization.'}/>
       
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
          {
            error && <Loader />
          }
          {reviews &&
            reviews.map((review) => (
              <SwiperSlide key={review._id} className="mb-10   ">
                <div className="border space-y-3 px-3 w-[392px]  py-5 border-gray-700 text-start rounded-md">
                  <div className=" flex items-center">
                    <div className="w-14 h-14 rounded-full ">
                      <img
                        className="rounded-full"
                        src={review?.image}
                        alt=""
                      />
                    </div>
                    <h5 className="font-semibold">{review?.name}</h5>
                  </div>
                  <div>
                    <Rating
                      readonly
                      className="text-black"
                      placeholderRating={review.ratting}
                      emptySymbol={<FaRegStar />}
                      placeholderSymbol={<FaStar color="gray" />}
                      fullSymbol={<FaStar color="gray" />}
                    />
                    <p className="text-base">
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
