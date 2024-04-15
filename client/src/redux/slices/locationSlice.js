import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location:localStorage.getItem("location") ,
}

const locationSlice = createSlice({
    name:"location",
    initialState: initialState,
    reducers:{
        setLocation(state, value){
            state.location = value.payload
        },

    }
})

export const {setLocation, setLoading} = locationSlice.actions;
export default locationSlice.reducer
