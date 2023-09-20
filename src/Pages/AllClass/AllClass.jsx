import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUClass } from "../Redux/Class/ClassSlice";
import Content from "../../Component/Content";
import Title from "../../Component/Design/Title";
import Loader from "../../Component/Loader/Loader";
import ClassCart from "../../Component/Design/ClassCart";
const AllClass = () => {
  const {
    isLoading,
    class: classData,
    review,
  } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUClass());
  }, []);
  return (
    <Content>
      <div className="pt-10">
        <Title
          mainTitle={"All Class Are Here"}
          subTitle={
            "We are hopeful that we can give good classes, this is our challenge and the challenge of our instructors"
          }
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
          {isLoading && <Loader />}
          {classData &&
            classData.map((Class) => (
              <ClassCart Class={Class}/>
              ))}
        </div>
      </div>
    </Content>
  );
};

export default AllClass;

// <div key={Class._id}>
  
//   {/* <section className="flex flex-col h-[365px] border border-cyan-600 rounded-lg px-1 py-1">
//     <article className="mx-auto relative flex-grow">
//       <div className="overflow-hidden rounded-lg">
//         <img
//           className="w-full rounded-lg h-[200px] transform hover:scale-110 duration-200"
//           src={Class?.courseImage}
//           alt="CourseImage"
//         />
//       </div>

//       <div className="pr-5  pt-2">
//         <h2 className="text-base font-semibold">
//           {Class?.courseName}
//         </h2>
//         <p className="font-semibold py-1">
//           Enroll Student: {Class.enrollStudents}
//         </p>
//         <div className="flex items-center justify-between">
//           <div className="flex gap-2">
//             <AiFillDollarCircle className="w-5 h-5" />
//             <p className="font-medium">${Class?.price}</p>
//           </div>
//           <div>
//             <Rating
//               readonly
//               className="text-black"
//               placeholderRating={Class?.ratting}
//               emptySymbol={<FaRegStar />}
//               placeholderSymbol={<FaStar color="black" />}
//               fullSymbol={<FaStar color="black" />}
//             />
//           </div>
//         </div>
//       </div>
//     </article>
//     <div className="mt-auto">
//       <Link to={Class?._id}>
//         <button className="secondary-btn w-full text-center justify-center flex items-center gap-1">
//           <MdDescription size={20} />
//           Details
//         </button>
//       </Link>
//     </div>
//   </section> */}
// </div>