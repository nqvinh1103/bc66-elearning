import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCourse: [],
    loading: false,
    error: false,
}

const courseSlice = createSlice({
    name: "courseManagenet",
    initialState,
    reducers: {
        getList: (state, { payload }) => { 
            state.listCourse = payload;
        },
    },
})

export const {
    actions: courseManagementActions,
    reducer: courseManagementReducers,
} = courseSlice