import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        email:"",
        localId:"",
        image:""
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setLocalId: (state,action) => {
            state.localId = action.payload
        },
        setImage: (state,action) => {
            state.image = action.payload
        }
    }
})

export const { setUserEmail,setLocalId,setImage} = userSlice.actions

export default userSlice.reducer