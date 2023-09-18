import { configureStore } from "@reduxjs/toolkit";
import ReviewsSlice from "./Reviews/ReviewsSlice";
import UsersSlice from "./Users/UsersSlice";
import ClassSlice from "./Class/ClassSlice";
import InstructorSlice from "./Instructor/InstructorSlice";



const store = configureStore({
    reducer: {
        reviews:ReviewsSlice,
        users:UsersSlice,
        class:ClassSlice,
        instructor:InstructorSlice
    }
 })
export default store; 
