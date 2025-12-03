import { configureStore } from "@reduxjs/toolkit";
import FeatureReducer from "./reducer/FeatureReducer";
import authenticationReducer from "./reducer/authenticationSlice";
import dataReducer from "./reducer/dataSlice";

export const store = configureStore({
  reducer: {
    feature: FeatureReducer,
    data: dataReducer,
    authentication: authenticationReducer,
  },
});
