import { configureStore } from "@reduxjs/toolkit";
import { reviewsReducer } from "./slices/reviews";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    auth: authReducer,
  },
});

export default store;
