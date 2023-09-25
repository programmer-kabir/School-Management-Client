import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
export const fetchInstructor = createAsyncThunk("instructor/fetchInstructor", async()=>{
    const res = await axios.get('https://server-kabi-r.vercel.app/instructor')
    return res.data
});
const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    isLoading: false,
    instructor: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstructor.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(fetchInstructor.fulfilled,(state, action)=>{
        state.isLoading=false;
        state.instructor= action.payload;
        state.error=null;
    })
    builder.addCase(fetchInstructor.rejected,(state,action)=>{
        state.isLoading=false;
        state.instructor= [];
        state.error=action.error.message;
    })
  },
});

export default instructorSlice.reducer;