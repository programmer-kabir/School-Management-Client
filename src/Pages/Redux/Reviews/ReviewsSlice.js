import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
export const fetchReviews = createAsyncThunk("reviews/fetchUReviews", async()=>{
    const res = await axios.get('https://server-kabi-r.vercel.app/reviews')
    return res.data
});
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    isLoading: false,
    reviews: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(fetchReviews.fulfilled,(state, action)=>{
        state.isLoading=false;
        state.reviews= action.payload;
        state.error=null;
    })
    builder.addCase(fetchReviews.rejected,(state,action)=>{
        state.isLoading=false;
        state.reviews= [];
        state.error=action.error.message;
    })
  },
});

export default reviewSlice.reducer;