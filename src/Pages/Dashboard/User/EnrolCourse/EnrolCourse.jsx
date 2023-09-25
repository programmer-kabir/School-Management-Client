import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const EnrolCourse = () => {
    return (
        <div className='pt-20'>
            <div className="flex mx-auto gap-2 items-center bg-[#10202B] text-white border border-teal-100 w-1/2 px-5 text-center py-5 rounded-xl">
            <AiOutlineExclamationCircle />{" "}
            <span>You did not book any course yet!</span>
          </div>
        </div>
    );
};

export default EnrolCourse;