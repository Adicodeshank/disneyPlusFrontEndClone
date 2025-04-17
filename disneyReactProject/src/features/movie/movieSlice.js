import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    recommended:null,
    newDisney: null,
    orignal:null,
    trending:null,
  };

  const movieSlice = createSlice({
    name:"movie",
    initialState,
        reducers:{
            setMovies:(state,action) =>{
                state.recommended = action.payload.recommended;
                state.newDisney = action.payload.newDisney;
                state.orignal = action.payload.orignal;
                state.trending = action.payload.trending;
            },
        },
    })

    export const { setMovies } = movieSlice.actions;

    export const selectRecommend = (state) => state.movie.recommended;
    export const selectNewDisney = (state) => state.movie.newDisney;
    export const selectOriginal = (state) => state.movie.orignal;
    export const selectTrending = (state) => state.movie.trending;
    
    export default movieSlice.reducer;