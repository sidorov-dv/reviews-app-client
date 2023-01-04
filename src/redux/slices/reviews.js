import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (type) => {
    const { data } = await axios.get(`/reviews/sorting/${type}`);
    return data;
  }
);

export const globalSearchReviews = createAsyncThunk(
  "reviews/globalSearchReviews",
  async (search) => {
    const { data } = await axios.get(`/reviews/text/?search=${search}`);
    return data;
  }
);

export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async (id) => {
    const { data } = await axios.get(`/reviews/userReviews/${id}`);
    return data;
  }
);

export const fetchSortingUserReviews = createAsyncThunk(
  "reviews/fetchSortingUserReviews",
  async ({ id, sort }) => {
    const { data } = await axios.get(
      `/reviews/sortUserReviews/${id}/?sort=${sort}`
    );
    return data;
  }
);

export const fetchTags = createAsyncThunk("reviews/fetchTags", async () => {
  const { data } = await axios.get("/reviews/tags");
  return data;
});

export const fetchReviewsByTags = createAsyncThunk(
  "reviews/fetchReviewsByTags",
  async (name) => {
    const { data } = await axios.get(`/reviews/tags/${name}`);
    return data;
  }
);

export const fetchUserReviewsByTags = createAsyncThunk(
  "reviews/fetchUserReviewsByTags",
  async ({ id, tag }) => {
    const { data } = await axios.get(
      `/reviews/sortUserReviewsByTags/${id}/?tag=${tag}`
    );
    return data;
  }
);

export const removeReview = createAsyncThunk(
  "reviews/removeReview",
  async (id) => {
    const { data } = await axios.delete(`/reviews/${id}`);
    return data;
  }
);

const initialState = {
  reviews: {
    items: [],
    searchReviews: [],
    userReviews: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      state.reviews.items = [];
      state.reviews.status = "loading";
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.reviews.items = action.payload;
      state.reviews.status = "loaded";
    },
    [fetchReviews.rejected]: (state) => {
      state.reviews.items = [];
      state.reviews.status = "error";
    },
    [globalSearchReviews.pending]: (state) => {
      state.reviews.searchReviews = [];
      state.reviews.status = "loading";
    },
    [globalSearchReviews.fulfilled]: (state, action) => {
      state.reviews.searchReviews = action.payload;
      state.reviews.status = "loaded";
    },
    [globalSearchReviews.rejected]: (state) => {
      state.reviews.searchReviews = [];
      state.reviews.status = "error";
    },
    [fetchReviewsByTags.pending]: (state) => {
      state.reviews.items = [];
      state.reviews.status = "loading";
    },
    [fetchReviewsByTags.fulfilled]: (state, action) => {
      state.reviews.items = action.payload;
      state.reviews.status = "loaded";
    },
    [fetchReviewsByTags.rejected]: (state) => {
      state.reviews.items = [];
      state.reviews.status = "error";
    },
    [fetchUserReviews.pending]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "loading";
    },
    [fetchUserReviews.fulfilled]: (state, action) => {
      state.reviews.userReviews = action.payload;
      state.reviews.status = "loaded";
    },
    [fetchUserReviews.rejected]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "error";
    },
    [fetchSortingUserReviews.pending]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "loading";
    },
    [fetchSortingUserReviews.fulfilled]: (state, action) => {
      state.reviews.userReviews = action.payload;
      state.reviews.status = "loaded";
    },
    [fetchSortingUserReviews.rejected]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "error";
    },
    [fetchUserReviewsByTags.pending]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "loading";
    },
    [fetchUserReviewsByTags.fulfilled]: (state, action) => {
      state.reviews.userReviews = action.payload;
      state.reviews.status = "loaded";
    },
    [fetchUserReviewsByTags.rejected]: (state) => {
      state.reviews.userReviews = [];
      state.reviews.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [removeReview.pending]: (state, action) => {
      state.reviews.items = state.reviews.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const reviewsReducer = reviewsSlice.reducer;
