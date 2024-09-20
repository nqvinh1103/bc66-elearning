import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userManagementActions } from "./userManagement";

export const store = configureStore({
    reducer: rootReducer,
})

store.dispatch(userManagementActions.getUserByAccessToken())