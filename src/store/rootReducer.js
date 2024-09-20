import { combineReducers } from "@reduxjs/toolkit";
import { courseManagementReducers } from "./courseManagement";
import { userManagementReducers } from "./userManagement";

export const rootReducer = combineReducers({
    userManagement: userManagementReducers,
    courseManagement: courseManagementReducers,
})