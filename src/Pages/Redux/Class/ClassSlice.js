import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
export const fetchUClass = createAsyncThunk("class/fetchUClass", async()=>{
    const res = await axios.get('http://localhost:5000/all-class')
    return res.data
});
const classSlice = createSlice({
  name: "class",
  initialState: {
    isLoading: false,
    class: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUClass.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(fetchUClass.fulfilled,(state, action)=>{
        state.isLoading=false;
        state.class= action.payload;
        state.error=null;
    })
    builder.addCase(fetchUClass.rejected,(state,action)=>{
        state.isLoading=false;
        state.class= [];
        state.error=action.error.message;
    })
  },
});

export default classSlice.reducer;